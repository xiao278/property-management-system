import { Router } from 'express';
import { TokenUserInfo } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import { HousingInfo, HousingSearchFilters, HousingSearchResult, HousingTitleQueryResult, HousingTypeQueryResult, HousingUnitInfo } from '../../../interface/HousingQuery';
import { AddressAttributes, Addresses, Countries } from '../../../database/models/Addresses.model'
import { HousingAttributes, Housings, HousingTypes } from '../../../database/models/Housings.model';
import { Currencies } from '../../../database/models/Currencies.model';
import { sequelize } from '../../../database/main';
import { SearchHousingQueryResult, SearchHousingQueryResultFormatted } from '../../../interface/HousingQuery';
import { AddressInfo } from '../../../interface/HousingQuery';
import { Sequelize } from 'sequelize';
import { Renovations } from '../../../database/models/Renovations.model';
import { Listify } from '../../../interface/QueryingGenerics';

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

    const formattedHousingFields = {...newHousingFields, 
        purchase_currency_id: (currencyResult[0].id),
        type_id: newHousingFields.housing_type.id
    };

    delete formattedHousingFields.housing_type;
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

export function emptyStringAsNull(input: string | null | undefined): string | null {
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
        country: emptyStringAsNull(form.country)
    }
    return newAddressFields;
}

function parseHousing(form: HousingUnitInfo):HousingUnitInfo {
    const newHousingFields: HousingUnitInfo = {
        bathrooms: form.bathrooms,
        bedrooms: form.bedrooms,
        size: form.size,
        housing_type: form.housing_type,
        address_id: form.address_id,
        furnish: form.furnish,
        unit: emptyStringAsNull(form.unit),
        purchase_date: form.purchase_date,
        purchase_currency: emptyStringAsNull(form.purchase_currency),
        purchase_price: form.purchase_price,
        dues_per_m2: form.dues_per_m2 ?? null,
        rent_price: form.rent_price ?? null,
        parking_lots: form.parking_lots
    }
    return newHousingFields;
}

housingRoutes.post('/create', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
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
            await t.rollback();
            res.status(500).json({message: "This housing already exists!"})
        }
        else {
            await t.commit();
            res.sendStatus(200);
        }   
    } 
    catch (error) {
        console.log(error)
        await t.rollback();
        res.status(500).json({message: error.message});
    }
})

housingRoutes.post('/search', authenticateToken, async (req, res) => {
    try {
        const filters = req.body as HousingSearchFilters;
        const housingResult = await Housings.findAll({
            attributes: {
                include: [[sequelize.col('address.country.name'), 'countryName']]
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
                { model: Currencies },
                { model: HousingTypes },
                {
                    model: Renovations,
                    order: [
                        ['end_date', 'DESC']
                    ],
                    limit: 1
                }
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
                    dues_per_m2: data.dues_per_m2 ? Number(data.dues_per_m2) : null,
                    renovation_date: data.renovations.length < 1 ? null : data.renovations[0].end_date,
                    address: {
                        ...data.address,
                        country: data.address.country.name
                    }
                }
                delete (formattedData as any).type_id;
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
        res.status(403).json({message: "Not an admin"});
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
        await t.commit();
        res.sendStatus(200);
    } 
    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

housingRoutes.post('/delete', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
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
        await t.commit();
        res.sendStatus(200);
    } 
    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

housingRoutes.get('/fetch-titles', authenticateToken, async (req, res) => {
    try {
        const housingResult = await Housings.findAll({
            attributes: ['id', 'unit'],
            include: [
                {
                    model: Addresses,
                    as: "address",
                    required: true,
                    include: [{ 
                        model: Countries,
                        as: "country",
                        attributes: ['name']
                    }]
                },
            ],
        });
        const responseBody: Listify<HousingTitleQueryResult> = {
            list: housingResult.map((housing) => {
                    const data = housing.dataValues as unknown as SearchHousingQueryResult;
                    const formattedData = {
                        id: data.id,
                        title: `${data.address.building_name ? `${data.unit ? `${data.unit} `: ""}${data.address.building_name}, ` : ""}`
                        + `${data.address.street_number ? `${data.address.street_number} ` : ""}${data.address.street_name}, `
                        + `${data.address.city}, ${data.address.state} ${data.address.postal_code}, ${data.address.country.name}`
                    }
                    return formattedData;
                })
        };     
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        return;
    }
});

export { housingRoutes }