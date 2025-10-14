import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenAuth";
import { PeriodTypes, RentalContracts, Tenants } from "../../../database/models/RentalContract.model";
import { Listify } from "../../../interface/QueryingGenerics";
import { RentalInfo, RentalQueryResult, TenantQueryResult } from "../../../interface/RentalQuery";
import { sequelize } from "../../../database/main";
import assert from "assert";

async function createRentalContract(form: RentalInfo) {
    if (form.contract.tenant_id < 0) {
        assert(form.tenant !== undefined, "Tenant information must be provided if tenant_id is negative");
        const tenant = await Tenants.findOrCreate({
            where: {name: form.tenant.name, email: form.tenant.email}, 
            defaults: form.tenant
        });
        form.contract.tenant_id = tenant[0].id;
    }
    const result = await RentalContracts.create(form.contract);
    return result;
}

const rentRoutes = Router();


/* CONTRACTS */

rentRoutes.get("/fetch-contracts", authenticateToken, async (req, res) => {
    const contracts = await RentalContracts.findAll({
        include: [
            {
                model: Tenants,
                attributes: ['firstname', 'lastname']
            },
            {
                model: PeriodTypes,
                attributes: ['name']
            }
        ]
    });
    const result:Listify<RentalQueryResult> = 
    {
        list: contracts.map((record) => {
            const formattedRecord = record.dataValues as unknown as RentalQueryResult;
            return formattedRecord;
        })
    }
    res.status(200).json()
});

rentRoutes.post("/create-contract", authenticateToken, async (req, res) => {
    const user = res.locals.user;

    if (!user.isAdmin) {
        res.status(403).json({message: "Not an admin"});
        return;
    }

    const t = await sequelize.transaction();

    try {
        const form = req.body as RentalInfo;
        const result = await createRentalContract(form);
        await t.commit();
        res.sendStatus(200);
    }
    catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

export async function calculateEndDate(startDate: Date, periodTypeId: number, periodCount: number): Promise<Date> {
    const endDate = new Date(startDate);
    const periodType = await PeriodTypes.findOne({where: {id: periodTypeId}}).then((record) => record?.dataValues.name);
    switch(periodType) {
        case "monthly": {
            endDate.setMonth(endDate.getMonth() + periodCount);
            break;
        }

        case "yearly": {
            endDate.setFullYear(endDate.getFullYear() + periodCount);
            break;
        }

        case "weekly": {
            endDate.setDate(endDate.getDate() + (7 * periodCount));
            break;
        }

        case "thirty-days": {
            endDate.setDate(endDate.getDate() + (30 * periodCount));
            break;
        }

        default: {
            endDate.setFullYear(0);
            endDate.setMonth(0);
            endDate.setDate(0);
            break;
        }
    }
    return endDate;
}

rentRoutes.get("/calculate-end-date", authenticateToken, async (req, res) => {
    const { startDate, periodTypeId, periodCount } = req.query;
    if (!startDate || !periodTypeId || !periodCount) {
        res.status(400).json({message: "Missing query parameters. Expecting startDate, periodTypeId, periodCount"});
        return;
    }
    const formattedStartDate = new Date(startDate as string);
    const formattedPeriodTypeId = Number(periodTypeId);
    const formattedPeriodCount = Number(periodCount);

    const endDate = await calculateEndDate(formattedStartDate, formattedPeriodTypeId, formattedPeriodCount);

    res.status(200).json({endDate: endDate.toISOString().split('T')[0]});
});

/* TENANTS */

rentRoutes.get("/fetch-tenants", authenticateToken, async (req, res) => {
    const tenants = await Tenants.findAll();
    try {
        const result:Listify<TenantQueryResult> = {list: tenants.map((record) => record.dataValues as TenantQueryResult)};
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
});

export { rentRoutes };