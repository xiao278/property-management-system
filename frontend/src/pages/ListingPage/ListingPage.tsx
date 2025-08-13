import { HousingList } from "./HousingList/HousingList";
import { HousingFilters } from "./HousingFilter/HousingFilters";
import "./ListingPage.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AddressSearchFilters, HousingSearchFilters } from "../../../../interface/HousingQuery";
import { useState } from "react";

export const listingPageRoute = "/listing";

export function ListingPage() {
    const methods = useForm<HousingSearchFilters>();
    const { handleSubmit } = methods;
    const [ searchFilters, setSearchFilters ] = useState<HousingSearchFilters | null>(null);
    const onFormSubmit: SubmitHandler<HousingSearchFilters> = async (data) => {
        setSearchFilters(data);
        console.log(data)
    }
    return (
        <div className="ListingPageContainer">
            <FormProvider {...methods} {...onFormSubmit}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <HousingFilters />
                </form>
            </FormProvider>
            <HousingList filters={searchFilters} />
        </div>
    );
}