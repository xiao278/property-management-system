import { Route, Routes } from "react-router-dom";
import { AdministrationPage, adminPageRoute } from '../pages/AdministrationPage/AdministrationPage';
import { DatabaseManagementPage, databaseManagementPageExtension } from '../pages/AdministrationPage/DatabaseManagementPage/DatabaseManagementPage';
import { ManageCategoriesPage, manageCategoriesPageExtension } from '../pages/AdministrationPage/DatabaseManagementPage/ManageCategoriesPage';


export function AdminRoutes() {
    return (
        <>
            <Route path={`${adminPageRoute}`}>
                <Route index element={<AdministrationPage />} />
                <Route path={`${databaseManagementPageExtension}`}>
                    <Route index element={<DatabaseManagementPage />} />
                    <Route path={`${manageCategoriesPageExtension}`} element={<ManageCategoriesPage />} />
                </Route>
            </Route>
        </>
    )
}