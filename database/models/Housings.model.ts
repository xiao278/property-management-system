import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';
import { Addresses } from './Addresses.model';
import { Currencies } from './Currencies.model';

interface HousingAttributes {
    property_id?: number;
    bathrooms: number;
    bedrooms: number;
    size: number; // m^2
    address_id: number;
    unit: string | null;
    purchase_date: string;
    purchase_price: number;
    purchase_currency: string;
}

interface HousingInstance extends Model<HousingAttributes>, HousingAttributes{}

const Housings = sequelize.define<HousingInstance>(
    'housings',
    {
        property_id: {
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
                key: 'address_id'
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
        purchase_currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            references: {
                model: Currencies,
                key: 'currency'
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
    foreignKey: 'purchase_currency'
})
Currencies.hasMany(Housings, {
    foreignKey: 'purchase_currency'
})

export { Housings, HousingAttributes }