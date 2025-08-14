import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';
import { Addresses } from './Addresses.model';
import { Currencies } from './Currencies.model';

interface HousingAttributes {
    id?: number;
    bathrooms: number;
    bedrooms: number;
    size: number; // m^2
    address_id: number;
    unit?: string | null;
    purchase_date: string;
    purchase_price: number;
    purchase_currency_id: string;
}

interface HousingInstance extends Model<HousingAttributes>, HousingAttributes{}

const Housings = sequelize.define<HousingInstance>(
    'housings',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: false,
            references: {
                model: Addresses,
                key: 'id'
            }
        },
        unit: {
            type: DataTypes.STRING(8),
            allowNull: true
        },
        purchase_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        purchase_price: {
            type: DataTypes.DECIMAL(13,2),
            allowNull: false
        }, 
        purchase_currency_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Currencies,
                key: 'id'
            }
        }
    }
);

Housings.belongsTo(Addresses, {
    foreignKey: 'address_id',
})
Addresses.hasMany(Housings, {
    foreignKey: 'address_id',
})

Housings.belongsTo(Currencies, {
    foreignKey: 'purchase_currency_id'
})
Currencies.hasMany(Housings, {
    foreignKey: 'purchase_currency_id'
})

export { Housings, HousingAttributes }