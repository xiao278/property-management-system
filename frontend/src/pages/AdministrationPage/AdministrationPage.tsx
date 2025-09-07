import { Link } from "@mui/material"
import { NavOption } from "../../components/Content/NavBar/NavOption"
import { databaseManagementPageExtension } from "./DatabaseManagementPage/DatabaseManagementPage"
import { useLocation } from "react-router-dom";

export const adminPageRoute = "/admin"

export function AdministrationPage() {
    const location = useLocation();
    return (
        <div>
            <Link href={`${location.pathname}/${databaseManagementPageExtension}`}>Database Management</Link>
        </div>
    )
}