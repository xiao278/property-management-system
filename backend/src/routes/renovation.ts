import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenAuth";
import { RenovationAttributes, Renovations } from "../../../database/models/Renovations.model";
import { RenovationQueryResult } from "../../../interface/RenovationQuery";
import { TokenUserInfo } from "../../../interface/Auth";
import { sequelize } from "../../../database/main";
import { emptyStringAsNull } from "./housing";

async function parseRenovations(form: RenovationAttributes):Promise<RenovationAttributes> {
    return ({
        id: form.id,
        housing_id: form.housing_id,
        end_date: form.end_date,
        notes: emptyStringAsNull(form.notes),
    })
}

const renovationRoutes = Router();

/** Fetches all renovations of one housing. expects format /fetch-all?housingId=1 */
renovationRoutes.get("/fetch-all", authenticateToken, async (req, res) => {
    const { housingId } = req.query;
    var formattedHousingId:number = -1;
    try {
        formattedHousingId = Number(housingId);
    }
    catch (error) {
        res.status(400).json({message: "invalid URL format. Expecting i.e. /fetch-all?housingId=1"});
        return;
    }
    const queryResult = await Renovations.findAll({
        where: {
            housing_id: formattedHousingId
        },
        order: [
            ['end_date', 'DESC']
        ]
    })
    const responseBody:RenovationQueryResult = {
        renovations: queryResult.map((value) => {
            const entry: RenovationAttributes = value.dataValues;
            return entry;
        })
    }
    res.status(200).json(responseBody)
});

renovationRoutes.post("/create", authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo;

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction();

    try {
        const form = await parseRenovations(req.body as RenovationAttributes)
        const result = await Renovations.create(form);
        await t.commit();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error)
        await t.rollback();
        res.status(500).json({message: error.message});
    }
})

export {renovationRoutes}