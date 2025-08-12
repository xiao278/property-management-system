import { useEffect, useState } from "react";
import { post } from "../../../api";
import "./HousingList.css";
import { HousingSearchResult } from "../../../../../interface/Query";
import { LoadingContentPlaceholder } from "../../../components/Template/LoadingContentPlaceholder/LoadingContentPlaceholder";
import { HousingSummaryCard } from "./HousingSummaryCard";

export function HousingList() {
    const [housingList, setHousingList] = useState<HousingSearchResult['housingList'] | null>(null);

    const fetchHousingListings = async () => {
        const housingListResponse = await post("/api/housing/search", {});
        if (!housingListResponse.ok) {
            const error = await housingListResponse.json()
            alert(`Failed to fetch housing listings: ${error.message}`);
            return;
        }
        const data = await housingListResponse.json() as HousingSearchResult;
        setHousingList(data.housingList);
        console.log(data);
    }

    useEffect(() => {
        fetchHousingListings();
    }, [])

    const color1 = "rgba(229, 236, 203, 1)"
    const color2 = "rgba(231, 238, 215, 1)"

    return (
        <div className="HousingListContainer" style={{ backgroundColor: (housingList ? housingList.length : 0) % 2 === 0 ? color1 : color2 }}>
            {housingList ? housingList.map((value, key) => {
                return (
                    <HousingSummaryCard housingData={value} key={key} itemNumber={key} />
                )
            }) : <LoadingContentPlaceholder />}
        </div>
    );
}