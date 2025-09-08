import { Router } from "express"
import { authenticateToken } from "../middlewares/tokenAuth";
import { CountrySearchResult } from "../../../interface/HousingQuery";
import { Addresses, Countries, CountryAttributes } from "../../../database/models/Addresses.model";
import { CategoryResult } from "../../../interface/CategoryQuery";
import { TokenUserInfo } from "../../../interface/Auth";
import { sequelize } from "../../../database/main";
import { Housings } from "../../../database/models/Housings.model";

export const categoryRoutes = Router();

categoryRoutes.post("/country/fetch", authenticateToken, async (req, res) => {
    try {
        const filters = req.body as Partial<CountryAttributes>;
        const countriesResult = await Countries.findAll({
            where: {
                ...(filters.name ? {name: filters.name} : undefined)
            }
        });
        const responseBody:CategoryResult<CountryAttributes> = {
            list: countriesResult.map((value) => {
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
            where: {id: 0},
            defaults: {name: "Deleted"}
        })
        await Addresses.update({country_id: 0}, {where: {country_id: filters.id}})
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