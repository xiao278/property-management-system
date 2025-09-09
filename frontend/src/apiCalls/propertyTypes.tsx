import { HousingTypeAttributes } from "../../../database/models/Housings.model";
import { CategoryResult } from "../../../interface/CategoryQuery";
import { HousingTypeQueryResult } from "../../../interface/HousingQuery";
import { get, post } from "../api";

export async function fetchPropertyTypes() {
    const res = await get("/api/category/property-type/fetch");        
    if (res.ok) {
        const data = await res.json() as CategoryResult<HousingTypeQueryResult>;
        return data.list;
    }
    return null;
}

export async function deletePropertyType(id: number) {
    const form: Partial<HousingTypeAttributes> = {id: id};
    const res = await post("/api/category/property-type/delete", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete property ${error.message}`)
    }
}

export async function createPropertyType(form: HousingTypeAttributes) {
    const res = await post("/api/category/property-type/create", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to create property ${error.message}`)
    }
}