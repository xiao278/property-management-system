import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface UserAttributes {
    username: string,
    password: string,
    role: 'admin' | 'operator',
    firstname?: string,
    lastname?: string 
}

interface UserInstance extends Model<UserAttributes>, UserAttributes{}

const Users = sequelize.define<UserInstance>(
    'users',
    {
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'operator'),
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(16),
            allowNull: false

        },
        lastname: {
            type: DataTypes.STRING(16),
            allowNull: false
        }
    },
);

export { Users }