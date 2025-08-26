import { useState } from "react";
import { SearchHousingQueryResultFormatted } from "../../../../../interface/HousingQuery";
import { AddressDisplay } from "../../../components/Content/AddressDisplay/AddressDisplay";
import { FlexWrapping } from "../../../components/Template/FlexWrapping/FlexWrapping";
import "./HousingSummaryCard.css";
import { HousingDetailPage } from "../../HousingDetailPage/HousingDetailPage";
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChairIcon from '@mui/icons-material/Chair';
import ConstructionIcon from '@mui/icons-material/Construction';
import PaymentsIcon from '@mui/icons-material/Payments';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    const purchase_date = new Date(housingData.purchase_date);
    return (
        <>
            <div className="HousingSummaryCardContainer" style={{backgroundColor: itemNumber % 2 === 0 ? color1 : color2}} onClick={() => setShowPopup(true)}>
                <AddressDisplay address={housingData.address} unit={housingData.unit} ></AddressDisplay>
                <div className="HousingSummaryCardDetailsContainer">
                    {/* <div>Beds: {housingData.bedrooms}</div>
                    <div>Baths: {housingData.bathrooms}</div>
                    <div>Size: {`${housingData.size} m^2`}</div>
                    <div>Price: {`${housingData.purchase_price} ${housingData.purchase_currency}`}</div>
                    <div>Purchase Date: {housingData.purchase_date}</div>
                    <div>Type: N/A</div>
                    <div>Status: N/A</div>
                    <div>Notes: N/A</div> */}
                    <div><ApartmentIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.bedrooms}BR ${housingData.type}`}</div>
                    <div><DirectionsCarIcon sx={{verticalAlign: "bottom"}} /> Parking todo</div>
                    <div><ChairIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.furnish} Furnished`}</div>
                    <div><ConstructionIcon sx={{verticalAlign: "bottom"}} /> Last Renovated todo</div>
                    <div><PaymentsIcon sx={{verticalAlign: "bottom"}} /> Rent todo</div>
                    <div><MonitorHeartIcon sx={{verticalAlign: "bottom"}} /> Rent Status todo</div>
                    <div><ElectricMeterIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.utility} Billing`}</div>
                    <div><AccessTimeIcon sx={{verticalAlign: "bottom"}} /> Acquired {`${purchase_date.getFullYear()}`}</div>
                </div>
            </div>
            <HousingDetailPage show={showPopup} setShow={setShowPopup} housingData={housingData} />
        </>
    )
}