import { Router } from 'express';
import { TokenUserInfo } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import { CountrySearchFilters, CountrySearchResult, HousingInfo, HousingSearchFilters, HousingSearchResult, HousingUnitInfo } from '../../../interface/HousingQuery';
import { AddressAttributes, Addresses, Countries } from '../../../database/models/Addresses.model'
import { HousingAttributes, Housings } from '../../../database/models/Housings.model';
import { Currencies } from '../../../database/models/Currencies.model';
import { sequelize } from '../../../database/main';
import { SearchHousingQueryResult, SearchHousingQueryResultFormatted } from '../../../interface/HousingQuery';
import { AddressInfo } from '../../../interface/HousingQuery';
import { Sequelize } from 'sequelize';

const housingRoutes = Router();

/* Gives back a object that can be directly used to create or update Housing.
 * Note that this does try to create address and currency
 **/
async function formatHousingFields(form: HousingInfo): Promise<HousingAttributes> {
    const newAddressFields = parseAddress(form.address);
    const newHousingFields = parseHousing(form.housing);
    
    const addressResult = await findOrCreateAddress(newAddressFields);
    newHousingFields.address_id = addressResult[0].id;

    const currencyResult = await Currencies.findOrCreate({where: {
        name: newHousingFields.purchase_currency
    }})

    const formattedHousingFields = {...newHousingFields, ...{purchase_currency_id: String(currencyResult[0].id)}};
    delete formattedHousingFields.purchase_currency;
    return formattedHousingFields as HousingAttributes;
}

async function findOrCreateAddress(form: AddressInfo): Promise<[AddressAttributes, Boolean]> {
    const countriesResult = await Countries.findOrCreate({where: {name: form.country}});
    const address = {...form, ...{country_id: countriesResult[0].id}}
    if (address.country) {delete address.country};
    const addressResult = await Addresses.findOrCreate({
        where: {
            street_name: address.street_name,
            street_number: emptyStringAsNull(address.street_number),
            building_name: emptyStringAsNull(address.building_name),
            postal_code: address.postal_code,
            state: address.state,
            country_id: address.country_id
        },
        defaults: address as AddressAttributes
    });
    return addressResult;
}

function emptyStringAsNull(input: string | null | undefined): string | null {
    return (
        input ? (
            input.length < 1 ? null : input
        ) : null
    )
    
}

function parseAddress(form: AddressInfo):AddressInfo {
    const newAddressFields:AddressInfo = {
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

function parseHousing(form: HousingUnitInfo):HousingUnitInfo {
    const newHousingFields: HousingUnitInfo = {
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
        const formattedHousingFields = await formatHousingFields(form);

        const housingResult = await Housings.findOrCreate({
            where: {
                address_id: formattedHousingFields.address_id,
                unit: emptyStringAsNull(formattedHousingFields.unit)
            },
            defaults: formattedHousingFields
        });
        if (!housingResult[1]) {
            t.rollback();
            res.status(500).json({message: "This housing already exists!"})
        }
        else {
            t.commit();
            res.sendStatus(200);
        }   
    } 
    catch (error) {
        console.log(error)
        t.rollback();
        res.status(500).json({message: error.message});
    }
})

housingRoutes.post('/search', authenticateToken, async (req, res) => {
    try {
        const filters = req.body as HousingSearchFilters;
        const housingResult = await Housings.findAll({
            attributes: {
                include: [[Sequelize.col('address.country.name'), 'countryName']]
            },
            where: {
                ...(filters.property_id ? {id: filters.property_id} : undefined)
            },
            include: [
                {
                    model: Addresses,
                    as: "address",
                    required: true,
                    where: {
                        ...(filters.address?.country_id ? {country_id: filters.address.country_id} : undefined)
                    },
                    include: [{ model: Countries, as: "country" }]
                },
                { model: Currencies }
            ],
            ...(emptyStringAsNull(filters.ordering?.orderBy) ? {
                order: [
                    [filters.ordering.orderBy, filters.ordering.ascending ? 'ASC' : 'DESC']
                ]
            } : undefined)
        })
        const responseBody:HousingSearchResult = {
            housingList: housingResult.map((housing) => {
                const data = housing.get({plain: true}) as unknown as SearchHousingQueryResult;
                const formattedData:SearchHousingQueryResultFormatted = {
                    ...data,
                    purchase_currency: data.currency.name,
                    purchase_price: Number(data.purchase_price),
                    address: {
                        ...data.address,
                        country: data.address.country.name
                    }
                }
                return formattedData;
            })
        }
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
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
        const formattedHousingFields = await formatHousingFields(form);
        const housingResult = await Housings.update(formattedHousingFields,{
            where: {
                id: form.housing.id
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
                id: filter.property_id
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
                ...(filters.name ? {name: filters.name} : undefined)
            }
        });
        const responseBody:CountrySearchResult = {
            countryList: countriesResult.map((value) => {
                const data = value.dataValues;
                return {
                    id: data.id,
                    name: data.name
                };
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