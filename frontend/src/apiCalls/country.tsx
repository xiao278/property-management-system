import { CountryAttributes } from "../../../database/models/Addresses.model";
import { CategoryResult } from "../../../interface/CategoryQuery";
import { CountryQueryResult } from "../../../interface/HousingQuery";
import { get, post } from "../api";

export async function fetchCountries() {
    const res = await get("/api/category/country/fetch");        
    if (res.ok) {
        const data = await res.json() as CategoryResult<CountryQueryResult>;
        return data.list;
    }
    return null;
}

export async function deleteCountry(id: number) {
    const form: Partial<CountryAttributes> = {id: id};
    const res = await post("/api/category/country/delete", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete country ${error.message}`)
    }
}