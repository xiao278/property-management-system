import { CategoryResult } from "../../../interface/CategoryQuery";
import { PeriodTypeQueryResult } from "../../../interface/RentalContractQuery";
import { PeriodTypeAttributes } from "../../../database/models/RentalContract.model";
import { get, post } from "../api";
import { RentalInfo, TenantQueryResult } from "../../../interface/RentalQuery";
import { Listify } from "../../../interface/QueryingGenerics";

/* PERIOD TYPES */

async function fetchPeriodTypes () {
    const res = await get("/api/category/period-type/fetch");
    if (res.ok) {
        const data = await res.json() as CategoryResult<PeriodTypeQueryResult>
        return data.list;
    }
    return null;
}

async function createPeriodType(form: PeriodTypeAttributes) {
    const res = await post("/api/category/period-type/create", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to create period type: ${error.message}`);
    }
}

async function deletePeriodType(id: number) {
    const res = await post("/api/category/period-type/delete", {id: id});
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete period type: ${error.message}`);
    }
}


/* CONTRACT */

async function createRentalContract(form: RentalInfo) {
    const res = await post("/api/rental-contract/create-contract", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to create rental contract: ${error.message}`);
    }
}

async function fetchRentalContracts() {
    const res = await get("/api/rental-contract/fetch-contracts");
    if (res.ok) {
        const data = await res.json() as Listify<RentalInfo>;
        return data.list;
    }
    return null;
}


/* TENANTS */

async function fetchTenants() {
    const res = await get("/api/rental-contract/fetch-tenants");
    if (res.ok) {
        const data = await res.json() as Listify<TenantQueryResult>;
        return data.list;
    }
    return null;
}

export { 
    fetchPeriodTypes, createPeriodType, deletePeriodType,
    createRentalContract, fetchRentalContracts,
    fetchTenants
};