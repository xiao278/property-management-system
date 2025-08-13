import { Router } from 'express';
import { TokenUserInfo } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import { CountrySearchFilters, CountrySearchResult, HousingInfo, HousingSearchFilters, HousingSearchResult } from '../../../interface/HousingQuery';
import { AddressAttributes, Addresses, Countries } from '../../../database/models/Addresses.model'
import { HousingAttributes, Housings } from '../../../database/models/Housings.model';
import { Currencies } from '../../../database/models/Currencies.model';
import { sequelize } from '../../../database/main';
import { SearchHousingQueryResult, SearchHousingQueryResultFormatted } from '../../../interface/HousingQuery';

const housingRoutes = Router();

async function findOrCreateAddress(form: AddressAttributes): Promise<[AddressAttributes, Boolean]> {
    const countriesResult = await Countries.findOrCreate({where: {country: form.country}});
    const addressResult = await Addresses.findOrCreate({where: {...form}});
    return addressResult;
}

function emptyStringAsNull(input: string | null | undefined): string | null {
    return (
        input ? (
            input.length < 1 ? null : input
        ) : null
    )
    
}

function parseAddress(form: HousingInfo):AddressAttributes {
    const newAddressFields:AddressAttributes = {
        building_name: emptyStringAsNull(form.building_name),
        street_number: emptyStringAsNull(form.street_number),
        street_name: form.street_name,
        postal_code: form.postal_code,
        city: form.city,
        state: form.state,
        country: form.country
    }
    return newAddressFields;
}

function parseHousing(form: HousingInfo):HousingAttributes {
    const newHousingFields: HousingAttributes = {
        bathrooms: form.bathrooms,
        bedrooms: form.bedrooms,
        size: form.size,
        address_id: form.address_id,
        unit: emptyStringAsNull(form.unit),
        purchase_date: form.purchase_date,
        purchase_currency: form.purchase_currency,
        purchase_price: form.purchase_price
    }
    return newHousingFields;
}

housingRoutes.post('/create', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(401).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction()

    try {
        const form = req.body as HousingInfo
        if (!form.address_id) {
            const newAddressFields = parseAddress(form);
            const addressResult = await findOrCreateAddress(newAddressFields);
            form.address_id = addressResult[0].address_id;
        }

        const currencyResult = await Currencies.findOrCreate({where: {
            currency: form.purchase_currency
        }})

        const newHousingFields = parseHousing(form);
        const housingResult = await Housings.findOrCreate({where: {...newHousingFields}})
        if (!housingResult[1]) {
            t.rollback();
            res.status(500).json({message: "failed to create housing"})
        }
        else {
            t.commit();
            res.sendStatus(200);
        }   
    } 
    catch (error) {
        console.log(error)
        t.rollback();
        res.status(500).json(error);
    }
})

housingRoutes.post('/search', authenticateToken, async (req, res) => {
    try {
        const filters = req.body as HousingSearchFilters;
        const housingResult = await Housings.findAll({
            attributes: [
                "property_id",
                "bathrooms",
                "bedrooms",
                "size",
                "unit",
                "purchase_date",
                "purchase_price",
                "purchase_currency"
            ],
            where: {
                ...(filters.property_id ? {property_id: filters.property_id} : undefined)
            },
            include: [
                {
                    model: Addresses,
                    attributes: ['address_id', 'building_name', 'street_number', 'street_name', 'postal_code', 'city', 'state', 'country'],
                    where: {
                        ...(filters.address?.country ? {country: filters.address.country} : undefined)
                    }
                },
            ]
        });
        const responseBody:HousingSearchResult = {
            housingList: housingResult.map((housing) => {
                const data = housing.dataValues as unknown as SearchHousingQueryResult;
                const formattedData:SearchHousingQueryResultFormatted = {
                    property_id: data.property_id,
                    bathrooms: data.bathrooms,
                    bedrooms: data.bedrooms,
                    size: data.size,
                    unit: data.unit,
                    purchase_date: data.purchase_date,
                    purchase_price: Number(data.purchase_price),
                    purchase_currency: data.purchase_currency,
                    address: {
                        address_id: data.address.address_id,
                        building_name: data.address.building_name,
                        street_number: data.address.street_number,
                        street_name: data.address.street_name,
                        postal_code: data.address.postal_code,
                        city: data.address.city,
                        state: data.address.state,
                        country: data.address.country
                    }
                }
                return formattedData;
            })
        }
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "error fetching housing data"});
        return;
    }
})

housingRoutes.post('/update', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(401).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction();
    try {
        const form = req.body as HousingInfo;
        const newAddressFields = parseAddress(form);
        const addressResult = await findOrCreateAddress(newAddressFields);
        if (addressResult[1]) {
            form.address_id = addressResult[0].address_id;
        }
        const newHousingFields = parseHousing(form);
        const housingResult = await Housings.update(newHousingFields,{
            where: {
                property_id: form.property_id
            }
        });
        t.commit();
        res.sendStatus(200);
    } 
    catch (error) {
        t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

housingRoutes.post('/delete', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(401).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction();
    try {
        const filter = req.body as HousingSearchFilters;
        const housingResult = await Housings.destroy({
            where: {
                property_id: filter.property_id
            }
        });
        if (housingResult < 1) {
            throw {message: "Unit does not exist"};
        }
        t.commit();
        res.sendStatus(200);
    } 
    catch (error) {
        t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

housingRoutes.post("/fetch-countries", authenticateToken, async (req, res) => {
    try {
        const filters = req.body as CountrySearchFilters;
        const countriesResult = await Countries.findAll({
            where: {
                ...(filters.country ? {property_id: filters.country} : undefined)
            }
        });
        const responseBody:CountrySearchResult = {
            countryList: countriesResult.map((value) => {
                const data = value.dataValues;
                return {
                    country: data.country
                }
            })
        }
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

export { housingRoutes }