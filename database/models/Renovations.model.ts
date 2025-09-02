import { DataTypes, Model } from "sequelize";
import { sequelize } from "../main";
import { Housings } from "./Housings.model";
import { Currencies } from "./Currencies.model";

interface RenovationAttributes {
    id?: number;
    housing_id: number;
    end_date: string; /** date of finish */
    notes: string;
}

interface RenovationInstance extends Model<RenovationAttributes>, RenovationAttributes{}

const Renovations = sequelize.define<RenovationInstance>(
    'renovations',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        housing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Housings,
                key: 'id'
            }
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true
        },
        notes: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
    }
)

Renovations.belongsTo(Housings, {
    foreignKey: 'housing_id'
})

Housings.hasMany(Renovations, {
    foreignKey: 'housing_id'
})

export { Renovations, RenovationAttributes }