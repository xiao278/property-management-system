import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';
import { Housings } from './Housings.model';

interface AddressAttributes {
    address_id?: number;
    building_name?: string | null;
    street_number?: string | null;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
}

interface CountryAttributes {
    country: string;
}

interface CountryInstance extends Model<CountryAttributes>, CountryAttributes{}

const Countries = sequelize.define<CountryInstance>(
    'countries_table',
    {
        'country': {
            type: DataTypes.STRING(64),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
    }
);

interface AddressInstance extends Model<AddressAttributes>, AddressAttributes{}

const Addresses = sequelize.define<AddressInstance>(
    'addresses',
    {
        address_id: {
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
        country: {
            type: DataTypes.STRING(64),
            allowNull: false,
            references: {
                model: Countries,
                key: 'country'
            }
        }
    },
);

Addresses.belongsTo(Countries, {
    foreignKey: 'country'
})

Countries.hasMany(Addresses, {
    foreignKey: 'country'
})

export { Addresses, AddressAttributes, Countries, CountryAttributes }