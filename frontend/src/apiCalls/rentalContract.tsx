import { CategoryResult } from "../../../interface/CategoryQuery";
import { PeriodTypeQueryResult } from "../../../interface/RentalContractQuery";
import { PeriodTypeAttributes } from "../../../database/models/RentalContract.model";
import { get, post } from "../api";

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

export { fetchPeriodTypes, createPeriodType, deletePeriodType };