import { Router } from 'express';
import { TokenUserInfo } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import { HousingInfo, HousingSearchResult } from '../../../interface/Query';
import { AddressAttributes, Addresses } from '../../../database/models/Addresses.model'
import { HousingAttributes, Housings } from '../../../database/models/Housings.model';
import { Currencies } from '../../../database/models/Currencies.model';
import { sequelize } from '../../../database/main';
import { SearchHousingQueryResult, SearchHousingQueryResultFormatted } from '../../../interface/Query';

const housingRoutes = Router();

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
            const newAddressFields:AddressAttributes = {
                building_name: form.building_name.length < 1 ? null : form.building_name,
                street_number: form.street_number.length < 1 ? null : form.street_number,
                street_name: form.street_name,
                postal_code: form.postal_code,
                city: form.city,
                state: form.state,
                country: form.country
            }
            const addressResult = await Addresses.findOrCreate({where: {...newAddressFields}});
            form.address_id = addressResult[0].address_id;
        }

        const currencyResult = await Currencies.findOrCreate({where: {
            currency: form.purchase_currency
        }})

        const newHousingFields: HousingAttributes = {
            bathrooms: form.bathrooms,
            bedrooms: form.bedrooms,
            size: form.size,
            address_id: form.address_id,
            unit: form.unit.length < 1 ? null : form.unit,
            purchase_date: form.purchase_date,
            purchase_currency: form.purchase_currency,
            purchase_price: form.purchase_price
        }

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
                // Add filtering logic here if needed
            },
            include: [
                {
                    model: Addresses,
                    attributes: ['address_id', 'building_name', 'street_number', 'street_name', 'postal_code', 'city', 'state', 'country'],
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

export { housingRoutes }