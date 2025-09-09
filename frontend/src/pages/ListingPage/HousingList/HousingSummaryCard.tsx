import { useState } from "react";
import { SearchHousingQueryResultFormatted } from "../../../../../interface/HousingQuery";
import { AddressDisplay } from "../../../components/Content/AddressDisplay/AddressDisplay";
import { FlexWrapping } from "../../../components/Template/FlexWrapping/FlexWrapping";
import { DateTime } from "luxon";
import "./HousingSummaryCard.css";
import { HousingDetailPage } from "../../HousingDetailPage/HousingDetailPage";
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChairIcon from '@mui/icons-material/Chair';
import ConstructionIcon from '@mui/icons-material/Construction';
import PaymentsIcon from '@mui/icons-material/Payments';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TollIcon from '@mui/icons-material/Toll';

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

function timeFromNow(date: DateTime) {
    const diff = DateTime.now().diff(date, ['years', 'months', 'days']);
    if (diff.years)   return { unit: "years",   value: Math.floor(diff.years) };
    if (diff.months)  return { unit: "months",  value: Math.floor(diff.months) };
    if (diff.days)    return { unit: "days",    value: Math.floor(diff.days) };
}

interface HousingSummaryCardProps {
    housingData: SearchHousingQueryResultFormatted
    itemNumber: number;
}

export function HousingSummaryCard(props: HousingSummaryCardProps) {
    const { housingData, itemNumber } = props;
    const [ showPopup, setShowPopup ] = useState(false);
    const color1 = "rgba(229, 236, 203, 1)"
    const color2 = "rgba(231, 238, 215, 1)"
    const purchase_date = DateTime.fromISO(housingData.purchase_date);
    const renovation_date = housingData.renovation_date ? DateTime.fromISO(housingData.renovation_date) : null;
    const renovation_ago =  renovation_date ? timeFromNow(renovation_date) : null;
    return (
        <>
            <div className="HousingSummaryCardContainer" style={{backgroundColor: itemNumber % 2 === 0 ? color1 : color2}} onClick={() => setShowPopup(true)}>
                <AddressDisplay address={housingData.address} unit={housingData.unit} ></AddressDisplay>
                <div className="HousingSummaryCardDetailsContainer">   
                    <div><ApartmentIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.bedrooms}BR ${housingData.housing_type.name}`}</div>
                    <div><DirectionsCarIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.parking_lots ? housingData.parking_lots : "No"} Parking`}</div>
                    <div><ChairIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.furnish} Furnished`}</div>
                    <div><ConstructionIcon sx={{verticalAlign: "bottom"}} /> {`Renovated ${renovation_ago ? `${renovation_ago.value} ${renovation_ago.unit} ago` : "never"}`}</div>
                    <div><PaymentsIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.rent_price ? `${Math.round(housingData.rent_price)} ${housingData.purchase_currency}` : "N/A"} Monthly Rent`}</div>
                    <div><MonitorHeartIcon sx={{verticalAlign: "bottom"}} /> Rent Status N/A</div>
                    <div><TollIcon sx={{verticalAlign: "bottom"}} /> {`${housingData.dues_per_m2 ? `${Math.round(housingData.dues_per_m2 * housingData.size)} ${housingData.purchase_currency}` : "N/A"} Monthly Fee`}</div>
                    <div><AccessTimeIcon sx={{verticalAlign: "bottom"}} /> Acquired {`${purchase_date.year}`}</div>
                </div>
            </div>
            <HousingDetailPage show={showPopup} setShow={setShowPopup} housingData={housingData} />
        </>
    )
}