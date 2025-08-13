import { useState } from "react";
import { SearchHousingQueryResultFormatted } from "../../../../../interface/HousingQuery";
import { AddressDisplay } from "../../../components/Content/AddressDisplay/AddressDisplay";
import { FlexWrapping } from "../../../components/Template/FlexWrapping/FlexWrapping";
import "./HousingSummaryCard.css";
import { HousingDetailPage } from "../../HousingDetailPage/HousingDetailPage";

// Recommended fields for a summary card:

// Address (street, city, unit if applicable)
// Type of housing (apartment, house, condo, loft, townhouse, duplex, studio, etc)
// Number of bedrooms
// Number of bathrooms
// Size (sq ft or m²)
// Unit number (if multi-unit)
// Purchase price & date (if relevant)
// Current rent / lease status (if tracked)
// Occupancy status (vacant, occupied, under maintenance)
// Notes or tags (e.g., “needs repairs”, “premium unit”)

interface HousingSummaryCardProps {
    housingData: SearchHousingQueryResultFormatted
    itemNumber: number;
}


export function HousingSummaryCard(props: HousingSummaryCardProps) {
    const { housingData, itemNumber } = props;
    const [ showPopup, setShowPopup ] = useState(false);
    const color1 = "rgba(229, 236, 203, 1)"
    const color2 = "rgba(231, 238, 215, 1)"
    return (
        <>
            <div className="HousingSummaryCardContainer" style={{backgroundColor: itemNumber % 2 === 0 ? color1 : color2}} onClick={() => setShowPopup(true)}>
                <AddressDisplay address={housingData.address} unit={housingData.unit} ></AddressDisplay>
                <div className="HousingSummaryCardDetailsContainer">
                    <div>Beds: {housingData.bedrooms}</div>
                    <div>Baths: {housingData.bathrooms}</div>
                    <div>Size: {`${housingData.size} m^2`}</div>
                    <div>Price: {`${housingData.purchase_price} ${housingData.purchase_currency}`}</div>
                    <div>Purchase Date: {housingData.purchase_date}</div>
                    <div>Type: N/A</div>
                    <div>Status: N/A</div>
                    <div>Notes: N/A</div>
                </div>
            </div>
            <HousingDetailPage show={showPopup} setShow={setShowPopup} housingData={housingData} />
        </>
    )
}