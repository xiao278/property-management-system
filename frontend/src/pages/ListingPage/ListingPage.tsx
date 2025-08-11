import { HousingList } from "./HousingList/HousingList";
import { HousingFilters } from "./HousingFilter/HousingFilters";
import "./ListingPage.css";
import { FormProvider, useForm } from "react-hook-form";

export const listingPageRoute = "/listing";

export function ListingPage() {
    const methods = useForm();
    return (
        <div className="ListingPageContainer">
            <FormProvider {...methods}>
                <HousingFilters />
            </FormProvider>
            <HousingList />
        </div>
    );
}