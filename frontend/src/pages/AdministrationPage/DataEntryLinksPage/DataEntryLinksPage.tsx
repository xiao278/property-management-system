import { Link } from "@mui/material";
import { housingEntryPageExtension } from "./HousingEntryPage/HousingEntryPage";
import { useLocation } from "react-router-dom";
import { rentalEntryPageExtension } from "./RentalEntryPage/RentalEntryPage";
import "./DataEntryLinksPage.css"
import { SubmitHandler } from "react-hook-form";
import { RentalInfo } from "../../../../../interface/RentalQuery";
import { post } from "../../../api";
import { fetchHousingTitles } from "../../../apiCalls/housing";
import { useEffect } from "react";

export const dataEntryLinksPageExtension = "data-entry-pagelist";

export function DataEntryLinksPage() {
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            const frog = await fetchHousingTitles();
            console.log(frog);
        }
        fetchData();
    }, []);
    return (
        <div className="AdminPageLinksContainer">
            <Link href={`${location.pathname}/${housingEntryPageExtension}`}>Enter New Property</Link>
            <Link href={`${location.pathname}/${rentalEntryPageExtension}`}>Enter New Rental Contract</Link>
        </div>
    );
}