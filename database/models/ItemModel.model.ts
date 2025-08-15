import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../main';

interface ItemManufacturerAttributes {
    id?: number;
    name: string;
}

interface ItemManufacturerInstace extends Model<ItemManufacturerAttributes>, ItemManufacturerAttributes{}

const ItemManufacturers = sequelize.define<ItemManufacturerInstace>(
    'item_manufacturers',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    }
)

interface ItemCategoryAttributes {
    id: number;
    name: string;
}

interface ItemCategoryInstance extends Model<ItemCategoryAttributes>, ItemCategoryAttributes{}

const ItemCategories = sequelize.define<ItemCategoryInstance>(
    'item_categories',
    {   
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    }
)

interface ItemModelAttributes {
    id: number;
    name: string;
    manufacturer_id: string;
    category_id: string;
    description?: string | null;
    product_code?: string | null;
}

interface ItemModelInstance extends Model<ItemModelAttributes>, ItemModelAttributes{}

const ItemModels = sequelize.define<ItemModelInstance>(
    'item_models',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ItemCategories,
                key: "id"
            }
        },
        manufacturer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ItemManufacturers,
                key: "id"
            }
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        product_code: {
            type: DataTypes.STRING(32),
            allowNull: true
        }
    }
);

ItemModels.belongsTo(ItemManufacturers, {
    foreignKey: "manufacturer_id"
});

ItemManufacturers.hasMany(ItemModels, {
    foreignKey: "manufacturer_id"
});

ItemModels.belongsTo(ItemCategories, {
    foreignKey: "category_id"
});

ItemCategories.hasMany(ItemModels, {
    foreignKey: "category_id"
});

export {
    ItemModels, ItemModelAttributes,
    ItemCategories, ItemCategoryAttributes,
    ItemManufacturers, ItemManufacturerAttributes
}