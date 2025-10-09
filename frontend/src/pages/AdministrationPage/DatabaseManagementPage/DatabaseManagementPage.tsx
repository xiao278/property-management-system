import { useLocation } from "react-router-dom";
import { manageCategoriesPageExtension } from "./ManageCategoriesPage/ManageCategoriesPage";
import { Link } from "@mui/material";
import "./DatabaseManagemetPage.css"

export const databaseManagementPageExtension = "manage-db"

export function DatabaseManagementPage () {
    const location = useLocation();
    return (
        <div className="AdminPageLinksContainer">
            <Link href={`${location.pathname}/${manageCategoriesPageExtension}`}>Category Management</Link>
        </div>
    )
}