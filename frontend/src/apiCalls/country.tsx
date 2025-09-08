import { CategoryResult } from "../../../interface/CategoryQuery";
import { CountryQueryResult } from "../../../interface/HousingQuery";
import { post } from "../api";

export async function fetchCountries() {
    const res = await post("/api/category/country/fetch", {});        
    if (res.ok) {
        const data = await res.json() as CategoryResult<CountryQueryResult>;
        return data.list;
    }
    return null;
}