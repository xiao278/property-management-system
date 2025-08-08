import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, "../.env")});
const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_USER_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false, // Disables createdAt and updatedAt globally
        },
    },
);

export { sequelize }