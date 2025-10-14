import { HousingTitleQueryResult } from "../../../interface/HousingQuery";
import { Listify } from "../../../interface/QueryingGenerics";
import { get } from "../api";

export async function fetchHousingTitles() {
    const res = await get("/api/housing/fetch-titles");
    if (res.ok) {
        const data = await res.json() as Listify<HousingTitleQueryResult>;
        return data.list;
    }
    return null;
}