import { Link } from "@mui/material";
import { housingEntryPageExtension } from "./HousingEntryPage/HousingEntryPage";
import { useLocation } from "react-router-dom";

export const dataEntryLinksPageExtension = "data-entry-pagelist";

export function DataEntryLinksPage() {
    const location = useLocation();
    return (
        <Link href={`${location.pathname}/${housingEntryPageExtension}`}>Enter New Property</Link>
    );
}