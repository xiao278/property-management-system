import { Router } from "express"
import { authenticateToken } from "../middlewares/tokenAuth";
import { CountrySearchResult } from "../../../interface/HousingQuery";
import { Addresses, Countries, CountryAttributes } from "../../../database/models/Addresses.model";
import { CategoryResult } from "../../../interface/CategoryQuery";
import { TokenUserInfo } from "../../../interface/Auth";
import { sequelize } from "../../../database/main";
import { Housings, HousingTypeAttributes, HousingTypes } from "../../../database/models/Housings.model";
import { Op } from "sequelize";
import { Currencies, CurrencyAttributes } from "../../../database/models/Currencies.model";
import { ModelStatic } from "sequelize";

export const categoryRoutes = Router();
const deletedId = -1;

async function categoryFetch<T extends {id: number, name: string}>(model: ModelStatic<any>) {
    const countriesResult = await model.findAll({
        where: {
            id: {[Op.ne]: deletedId},
        }
    });
    const responseBody:CategoryResult<T> = {
        list: countriesResult.map((value) => {
            const data = value.dataValues;
            return data;
        })
    }
    return responseBody
}

categoryRoutes.get("/country/fetch", authenticateToken, async (req, res) => {
    try {
        const responseBody = await categoryFetch(Countries);
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

categoryRoutes.post("/country/delete", authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const filters = req.body as Partial<CountryAttributes>;
    if (!filters.id) {
        res.status(400).json({message: "id not provided in JSON"});
        return;
    }

    const t = await sequelize.transaction();

    try {
        await Countries.findOrCreate({
            where: {id: deletedId},
            defaults: {
                id: deletedId,
                name: "Deleted"
            }
        })
        await Addresses.update({country_id: deletedId}, {where: {country_id: filters.id}})
        await Countries.destroy({where: {id: filters.id}});
        await t.commit();
        res.sendStatus(200);
    }

    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

categoryRoutes.get("/currency/fetch", authenticateToken, async (req, res) => {
    try {
        const responseBody = await categoryFetch(Currencies);
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

categoryRoutes.post("/currency/delete", authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const filters = req.body as Partial<CurrencyAttributes>;
    if (!filters.id) {
        res.status(400).json({message: "id not provided in JSON"});
        return;
    }

    const t = await sequelize.transaction();

    try {
        await Currencies.findOrCreate({
            where: {id: deletedId},
            defaults: {
                id: deletedId,
                name: "XXX"
            }
        })
        await Housings.update({purchase_currency_id: deletedId}, {where: {purchase_currency_id: filters.id}})
        await Currencies.destroy({where: {id: filters.id}});
        await t.commit();
        res.sendStatus(200);
    }

    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

categoryRoutes.get("/property-type/fetch", async (req, res) => {
    try {
        const responseBody = await categoryFetch(HousingTypes);
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

categoryRoutes.post("/property-type/delete", authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const filters = req.body as Partial<HousingTypeAttributes>;
    if (!filters.id) {
        res.status(400).json({message: "id not provided in JSON"});
        return;
    }

    const t = await sequelize.transaction();

    try {
        await HousingTypes.findOrCreate({
            where: {id: deletedId},
            defaults: {
                id: deletedId,
                name: "Deleted"
            }
        })
        await Housings.update({type_id: deletedId}, {where: {type_id: filters.id}})
        await HousingTypes.destroy({where: {id: filters.id}});
        await t.commit();
        res.sendStatus(200);
    }

    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

categoryRoutes.post("/property-type/create", authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const body = req.body as HousingTypeAttributes;

    const t = await sequelize.transaction();
    
    try {
        await HousingTypes.create(body);
        await t.commit();
        res.sendStatus(200);
    }
    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
})