import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface HousingAttributes {
    property_id: number;
    bathrooms: number;
    bedrooms: number;
    size: number; // m^2
    address_id: number;
    unit: string | null;
    purchase_date: Date
}

interface HousingInstance extends Model<HousingAttributes>, HousingAttributes{}

const Housings = sequelize.define<HousingInstance>(
    'housings',
    {
        property_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING(8),
            allowNull: true
        },
        purchase_date: {
            type: DataTypes.DATEONLY
        }
    }
);

export { Housings }