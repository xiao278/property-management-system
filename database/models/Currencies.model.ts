import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface CurrencyAttributes {
    id?: number;
    name: string;
}

interface CurrencyInstance extends Model<CurrencyAttributes>, CurrencyAttributes{}

const Currencies = sequelize.define<CurrencyInstance>(
    'currencies',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(3),
            allowNull: false,
            unique: true
        }
    }
)

export { Currencies, CurrencyAttributes }