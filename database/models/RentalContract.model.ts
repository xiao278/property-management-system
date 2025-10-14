import { DataTypes, Model } from "sequelize";
import { Housings } from "./Housings.model";
import { sequelize } from "../main";
import { Currencies } from "./Currencies.model";

interface TenantAttributes {
    id?: number;
    name: string;
    email?: string;
    phone?: string;
}

interface TenantInstance extends Model<TenantAttributes>, TenantAttributes{}

const Tenants = sequelize.define<TenantInstance>(
    'tenants',
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
        },
        email: {
            type: DataTypes.STRING(32),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(21),
            allowNull: true,
        }
    }
)


interface PeriodTypeAttributes {
    id?: number;
    name: string; // monthly, periodically (every week, 30 days), yearly
}

interface PeriodTypeInstance extends Model<PeriodTypeAttributes>, PeriodTypeAttributes{}

const PeriodTypes = sequelize.define<PeriodTypeInstance>(
    "period_types",
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
)


interface RentalContractAttributes {
    id?: number;
    housing_id: number;
    tenant_id: number;
    start_date: string;
    periods: number;
    period_type_id: number; // monthly, periodically (every week, 30 days), yearly
    rent: number;
    deposit: number;
    currency_id: number;
}

interface RentalContractInstance extends Model<RentalContractAttributes>, RentalContractAttributes{}

const RentalContracts = sequelize.define<RentalContractInstance>(
    'rental_contracts',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        housing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Housings,
                key: 'id'
            }
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tenants,
                key: 'id'
            }
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        periods: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        period_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PeriodTypes,
                key: 'id'
            }
        },
        rent: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        deposit: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        currency_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Currencies,
                key: 'id'
            }
        }
    }
)

RentalContracts.belongsTo(Housings, {
    foreignKey: 'housing_id'
})

Housings.hasMany(RentalContracts, {
    foreignKey: 'housing_id'
})



RentalContracts.belongsTo(Tenants, {
    foreignKey: 'tenant_id'
})

Tenants.hasMany(RentalContracts, {
    foreignKey: 'tenant_id'
})



RentalContracts.belongsTo(PeriodTypes, {
    foreignKey: 'period_type_id'
})

PeriodTypes.hasMany(RentalContracts, {
    foreignKey: 'period_type_id'
})



RentalContracts.belongsTo(Currencies, {
    foreignKey: 'currency_id'
})

Currencies.hasMany(RentalContracts, {
    foreignKey: 'currency_id'
})

export { 
    RentalContracts, RentalContractAttributes, 
    Tenants, TenantAttributes, 
    PeriodTypes, PeriodTypeAttributes 
}