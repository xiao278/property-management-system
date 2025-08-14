import { HousingList } from "./HousingList/HousingList";
import { HousingFilters } from "./HousingFilter/HousingFilters";
import "./ListingPage.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { HousingSearchFilters, HousingSearchResult } from "../../../../interface/HousingQuery";
import { useEffect, useState } from "react";
import { post } from "../../api";

export const listingPageRoute = "/listing";

export function ListingPage() {
    const methods = useForm<HousingSearchFilters>({
        defaultValues: {
            ordering: {
                ascending: false
            },
            address: {
                country_id: undefined
            }
        }
    });
    const { handleSubmit } = methods;
    const [ searchFilters, setSearchFilters ] = useState<HousingSearchFilters | null>(null);
    const onFormSubmit: SubmitHandler<HousingSearchFilters> = async (data) => {
        const formatted = data as HousingSearchFilters;
        console.log(formatted);
        setSearchFilters(formatted);
    }
    const [ housingList, setHousingList ] = useState<HousingSearchResult['housingList'] | null>(null);
    

    useEffect(() => {
        const fetchHousingListings = async () => {
            const reqBody:HousingSearchFilters = searchFilters ? searchFilters : {};
            const housingListResponse = await post("/api/housing/search", reqBody);
            if (!housingListResponse.ok) {
                const error = await housingListResponse.json()
                alert(`Failed to fetch housing listings: ${error.message}`);
                return;
            }
            const data = await housingListResponse.json() as HousingSearchResult;
            console.log(data)
            setHousingList(data.housingList);
        }
        fetchHousingListings();
    }, [searchFilters])
    return (
        <div className="ListingPageContainer">
            <FormProvider {...methods} {...onFormSubmit}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <HousingFilters />
                </form>
            </FormProvider>
            <HousingList listing={housingList} />
        </div>
    );
}