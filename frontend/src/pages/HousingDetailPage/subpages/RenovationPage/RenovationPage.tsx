import { useEffect, useState } from "react";
import { SearchHousingQueryResultFormatted } from "../../../../../../interface/HousingQuery";
import { RenovationQueryResult } from "../../../../../../interface/RenovationQuery";
import { RenovationAttributes } from "../../../../../../database/models/Renovations.model";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { get, post } from "../../../../api";
import { InteractiveTable } from "../../../../components/Template/DataTable/InteractiveTable/InteractiveTable";
import { FormInput } from "../../../../components/Template/FormInput/FormInput";

interface RenovationPageProps {
    housingData: SearchHousingQueryResultFormatted
}

export function RenovationPage(props: RenovationPageProps) {
    const { housingData } = props;
    const [ listings, setListings ] = useState<RenovationQueryResult['renovations'] | null>();
    const [ formData, setFormData ] = useState<RenovationAttributes | null>();
    const methods = useForm<RenovationAttributes>();
    
    const { handleSubmit, reset } = methods;
    const onFormSubmit: SubmitHandler<RenovationAttributes> = async (data) => {
        data.housing_id = housingData.id;
        const res = await post("/api/renovation/create", data);
        if (res.ok) {
            reset();
            setFormData(data);
        }
        else {
            const error = await res.json();
            alert(`Failed to create: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchListData = async () => {
            const res = await get("/api/renovation/fetch-all", {housingId: String(housingData.id)});
            if (res.ok) {
                const data = await res.json() as unknown as RenovationQueryResult;
                setListings(data.renovations);
            }
            else {
                const error = await res.json();
                alert(`Failed to fetch: ${error.message}`);
            }
        }
        fetchListData();
    }, [housingData.id, formData])
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <InteractiveTable<RenovationAttributes> primaryColumn="end_date" columns={{
                    end_date: {displayName: "Date (YYYY-MM-DD)", input: <FormInput type="date" fieldName="end_date"/>}
                }}
                detailedFields={{notes: "Notes"}}
                rows={listings}/>
            </form>
        </FormProvider>
    )
}