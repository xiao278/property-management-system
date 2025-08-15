import { DataTypes, Model } from "sequelize";
import { sequelize } from "../main";

interface ItemAttributes {
    id?: number;
    name: string;
}

interface ItemInstance extends Model<ItemAttributes>, ItemAttributes{}

const Items = sequelize.define<ItemInstance>(
    'items',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    }
)