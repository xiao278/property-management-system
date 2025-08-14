import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../main';

interface ItemManufacturerAttributes {
    name: string;
}

interface ItemManufacturerInstace extends Model<ItemManufacturerAttributes>, ItemManufacturerAttributes{}

const ItemManufacturers = sequelize.define<ItemManufacturerInstace>(
    'item_manufacturers',
    {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        }
    }
)

interface ItemCategoryAttributes {
    name: string;
}

interface ItemCategoryInstance extends Model<ItemCategoryAttributes>, ItemCategoryAttributes{}

const ItemCategories = sequelize.define<ItemCategoryInstance>(
    'item_categories',
    {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        }
    }
)

interface ItemModelAttributes {
    item_id?: number;
    name: string;
    manufacturer: string;

}

interface ItemModelInstance extends Model<ItemModelAttributes>, ItemModelAttributes{}

// const IEeji = sequelize.define<ItemModelInstance>(
//     'item_models',
//     {
//         item_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         }
//     }
// );