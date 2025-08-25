import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';
import { Addresses } from './Addresses.model';
import { Currencies } from './Currencies.model';

interface HousingTypeAttributes {
    id?: number;
    name: string;
}

interface HousingTypeInstance extends Model<HousingTypeAttributes>, HousingTypeAttributes{}

const HousingTypes = sequelize.define<HousingTypeInstance>(
    'housing_types',
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
            unique: true
        }
    }
);


interface HousingAttributes {
    id?: number;
    bathrooms: number;
    bedrooms: number;
    type_id: number;
    size: number; // m^2
    address_id: number;
    unit?: string | null;
    purchase_date: string;
    purchase_price: number;
    purchase_currency_id: number;
    utility: "Fixed" | "Shared" | "Individual";
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
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: HousingTypes,
                key: 'id'
            }
        },
        utility: {
            type: DataTypes.ENUM("Fixed", "Shared", "Individual"),
            allowNull: false,
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

Housings.belongsTo(HousingTypes, {
    foreignKey: 'type_id'
})

HousingTypes.hasMany(Housings, {
    foreignKey: 'type_id'
})

export { 
    Housings, HousingAttributes, 
    HousingTypes, HousingTypeAttributes 
}