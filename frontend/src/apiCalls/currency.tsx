import { CurrencyAttributes } from "../../../database/models/Currencies.model";
import { CategoryResult } from "../../../interface/CategoryQuery";
import { CurrencyQueryResult } from "../../../interface/miscQuery/CurrencyQuery";
import { get, post } from "../api";

export async function fetchCurrencies() {
    const res = await get("/api/category/currency/fetch");        
    if (res.ok) {
        const data = await res.json() as CategoryResult<CurrencyQueryResult>;
        return data.list;
    }
    return null;
}

export async function deleteCurrency(id: number) {
    const form: Partial<CurrencyAttributes> = {id: id};
    const res = await post("/api/category/currency/delete", form);
    if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete currency ${error.message}`)
    }
}