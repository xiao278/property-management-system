import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface CurrencyAttributes {
    currency: string;
}

interface CurrencyInstance extends Model<CurrencyAttributes>, CurrencyAttributes{}

const Currencies = sequelize.define(
    'currencies',
    {
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }
)

export { Currencies, CurrencyAttributes }