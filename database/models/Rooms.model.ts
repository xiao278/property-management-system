import { DataTypes, Model } from "sequelize";
import { sequelize } from "../main";
import { Housings } from "./Housings.model";

interface RoomAttributes {
    id?: number;
    housing_id: number;
    name: string;
    size?: number;
    floor?: number;
    notes?: string;
}

interface RoomInstance extends Model<RoomAttributes>, RoomAttributes{}

const Rooms = sequelize.define<RoomInstance>(
    'rooms',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        housing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Housings,
                key: 'id'
            }
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        floor: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        notes: {
            type: DataTypes.STRING(256),
            allowNull: true
        }
    }
)

Rooms.belongsTo(Housings, {
    foreignKey: 'housing_id'
})

Housings.hasMany(Rooms, {
    foreignKey: 'housing_id'
})

export { Rooms, RoomAttributes }