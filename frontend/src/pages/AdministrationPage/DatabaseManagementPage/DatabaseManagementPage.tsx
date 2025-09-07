import { useLocation } from "react-router-dom";
import { NavOption } from "../../../components/Content/NavBar/NavOption";
import { manageCategoriesPageExtension } from "./ManageCategoriesPage";
import { Link } from "@mui/material";

export const databaseManagementPageExtension = "manage-db"

export function DatabaseManagementPage () {
    const location = useLocation();
    return (
        <div>
            <Link href={`${location.pathname}/${manageCategoriesPageExtension}`}>Category Management</Link>
        </div>
    )
}