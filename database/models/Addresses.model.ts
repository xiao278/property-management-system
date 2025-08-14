import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface CountryAttributes {
    id?: number
    name: string;
}

interface CountryInstance extends Model<CountryAttributes>, CountryAttributes{}

const Countries = sequelize.define<CountryInstance>(
    'countries',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
    }
);

interface AddressAttributes {
    id?: number;
    building_name?: string | null;
    street_number?: string | null;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country_id: number;
}


interface AddressInstance extends Model<AddressAttributes>, AddressAttributes{}

const Addresses = sequelize.define<AddressInstance>(
    'addresses',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        building_name: {
            type: DataTypes.STRING(32),
            allowNull: true,
        },
        street_number: {
            type: DataTypes.STRING(8),
            allowNull: true,
        },
        street_name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Countries,
                key: 'id'
            }
        }
    },
);

Addresses.belongsTo(Countries, {
    foreignKey: 'country_id'
})

Countries.hasMany(Addresses, {
    foreignKey: 'country_id'
})

export { Addresses, AddressAttributes, Countries, CountryAttributes }