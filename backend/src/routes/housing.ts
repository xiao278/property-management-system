import { Router } from 'express';
import { TokenUserInfo } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import { HousingFormInput } from '../../../interface/Query';
import { AddressAttributes, Addresses } from '../../../database/models/Addresses.model'
import { HousingAttributes, Housings } from '../../../database/models/Housings.model';
import { Currencies } from '../../../database/models/Currencies.model';

const housingRoutes = Router();

housingRoutes.post('/create', authenticateToken, async (req, res) => {
    const user:TokenUserInfo = res.locals.user

    if (!user.isAdmin) {
        res.status(401).json({error: "Not an admin"});
    }

    try {
        const form = req.body as HousingFormInput
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
            unit: form.unit,
            purchase_date: form.purchase_date,
            purchase_currency: form.purchase_currency,
            purchase_price: form.purchase_price
        }

        const housingResult = await Housings.findOrCreate({where: {...newHousingFields}})
        if (!housingResult[1]) {
            res.status(500).json({error: "failed to create housing"})
        }
        else {
            res.sendStatus(200);
        }   
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

export { housingRoutes }