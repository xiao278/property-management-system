import { Link } from "@mui/material"
import { databaseManagementPageExtension } from "./DatabaseManagementPage/DatabaseManagementPage"
import { useLocation } from "react-router-dom";
import { dataEntryLinksPageExtension } from "./DataEntryLinksPage/DataEntryLinksPage";
import "./AdministrationPage.css"
import { AuthOrHide } from "../../components/Auth/AuthOrHide";

export const adminPageRoute = "/admin"

export function AdministrationPage() {
    const location = useLocation();
    return (
        <div className="AdminPageLinksContainer">
            <AuthOrHide adminOnly={true}>
                <Link href={`${location.pathname}/${databaseManagementPageExtension}`}>Database Management</Link>
            </AuthOrHide>
            <Link href={`${location.pathname}/${dataEntryLinksPageExtension}`}>Data Entry</Link>
        </div>
    )
}