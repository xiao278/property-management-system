import { Route, Routes } from "react-router-dom";
import { AdministrationPage, adminPageRoute } from '../pages/AdministrationPage/AdministrationPage';
import { DatabaseManagementPage, databaseManagementPageExtension } from '../pages/AdministrationPage/DatabaseManagementPage/DatabaseManagementPage';
import { ManageCategoriesPage, manageCategoriesPageExtension } from '../pages/AdministrationPage/DatabaseManagementPage/ManageCategoriesPage/ManageCategoriesPage';
import { HousingEntryPage, housingEntryPageExtension } from "../pages/AdministrationPage/DataEntryLinksPage/HousingEntryPage/HousingEntryPage";
import { DataEntryLinksPage,dataEntryLinksPageExtension } from "../pages/AdministrationPage/DataEntryLinksPage/DataEntryLinksPage";
import { RentalEntryPage, rentalEntryPageExtension } from "../pages/AdministrationPage/DataEntryLinksPage/RentalEntryPage/RentalEntryPage";

export function AdminRoutes() {
    return (
        <>
            <Route path={`${adminPageRoute}`}>
                <Route index element={<AdministrationPage />} />
                <Route path={`${databaseManagementPageExtension}`}>
                    <Route index element={<DatabaseManagementPage />} />
                    <Route path={`${manageCategoriesPageExtension}`} element={<ManageCategoriesPage />} />
                    <Route path={`${housingEntryPageExtension}`} element={<HousingEntryPage />} />
                </Route>
                <Route path={`${dataEntryLinksPageExtension}`}>
                    <Route index element={<DataEntryLinksPage />} />
                    <Route path={`${housingEntryPageExtension}`} element={<HousingEntryPage />} />
                    <Route path={`${rentalEntryPageExtension}`} element={<RentalEntryPage /> } />
                </Route>
            </Route>
        </>
    )
}