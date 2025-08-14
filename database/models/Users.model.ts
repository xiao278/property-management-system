import { sequelize } from '../main';
import { DataTypes, Model } from 'sequelize';

interface UserAttributes {
    id?: number
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
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(60),
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

// associations in housings.model

export { Users, UserAttributes }