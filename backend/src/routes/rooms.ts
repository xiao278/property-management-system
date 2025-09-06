import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenAuth";
import { sequelize } from "../../../database/main";
import { TokenUserInfo } from "../../../interface/Auth";
import { RoomAttributes, Rooms } from "../../../database/models/Rooms.model";
import { emptyStringAsNull } from "./housing";
import { RoomQueryResult, RoomSearchFilters } from "../../../interface/RoomQuery";

const roomRoutes = Router();

async function parseRoom(form: RoomAttributes):Promise<RoomAttributes> {
    return ({
        id: form.id,
        housing_id: form.housing_id,
        name: form.name,
        notes: emptyStringAsNull(form.notes),
        size: form.size ?? null,
        floor: form.floor
    })
}

roomRoutes.post('/fetch-rooms', authenticateToken, async (req, res) => {
    try {
        const form = req.body as RoomSearchFilters

        const roomResult = await Rooms.findAll({
            where: {
                housing_id: form.housing_id,
            }
        });

        const responseBody: RoomQueryResult = {
            rooms: roomResult.map((room, index) => {
                return room.dataValues;
            })
        }

        res.status(200).json(responseBody);

    } 
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
})

roomRoutes.post('/create', authenticateToken, async (req, res) => {
    const user = res.locals.user as TokenUserInfo 

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction()

    try {
        const form = await parseRoom(req.body as RoomAttributes)

        const roomResult = await Rooms.findOrCreate({
            where: {
                housing_id: form.housing_id,
                name: form.name
            },
            defaults: form
        });
        if (!roomResult[1]) {
            t.rollback();
            res.status(500).json({message: "This room already exists!"})
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

export { roomRoutes }