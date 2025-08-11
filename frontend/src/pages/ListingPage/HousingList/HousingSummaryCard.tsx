import { SearchHousingQueryResultFormatted } from "../../../../../interface/Query";

interface HousingSummaryCardProps {
    housingData: SearchHousingQueryResultFormatted
}
export function HousingSummaryCard(props: HousingSummaryCardProps) {
    const { housingData } = props;
    return (
        <div className="HousingSummaryCardContainer">{JSON.stringify(housingData.address)}</div>
    )
}