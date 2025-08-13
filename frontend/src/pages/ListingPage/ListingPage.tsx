import { HousingList } from "./HousingList/HousingList";
import { HousingFilters } from "./HousingFilter/HousingFilters";
import "./ListingPage.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { HousingSearchFilters } from "../../../../interface/HousingQuery";
import { useState } from "react";

export const listingPageRoute = "/listing";

export function ListingPage() {
    const methods = useForm<HousingSearchFilters>({
        defaultValues: {ordering: {
            ascending: false
        }}
    });
    const { handleSubmit } = methods;
    const [ searchFilters, setSearchFilters ] = useState<HousingSearchFilters | null>(null);
    const onFormSubmit: SubmitHandler<HousingSearchFilters> = async (data) => {
        const formatted = data as HousingSearchFilters;
        console.log(formatted);
        setSearchFilters(formatted);
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