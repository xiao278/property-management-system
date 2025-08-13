import "./HousingList.css";
import { HousingSearchResult } from "../../../../../interface/HousingQuery";
import { LoadingContentPlaceholder } from "../../../components/Template/LoadingContentPlaceholder/LoadingContentPlaceholder";
import { HousingSummaryCard } from "./HousingSummaryCard";

interface HousingListProps {
    listing: HousingSearchResult['housingList'] | null;
}

export function HousingList(props: HousingListProps) {
    const { listing } = props;
    const color1 = "rgba(229, 236, 203, 1)"
    const color2 = "rgba(231, 238, 215, 1)"

    return (
        <div className="HousingListContainer" style={{ backgroundColor: (listing ? listing.length : 0) % 2 === 0 ? color1 : color2 }}>
            {listing ? listing.map((value, key) => {
                return (
                    <HousingSummaryCard housingData={value} key={key} itemNumber={key} />
                )
            }) : <LoadingContentPlaceholder />}
        </div>
    );
}