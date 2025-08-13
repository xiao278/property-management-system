import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { HousingInfo } from "../../../../interface/HousingQuery";
import { HousingForm } from "../../components/Content/HousingForm/HousingForm"
import "./HousingEntryPage.css"
import { post } from "../../api";


export const housingEntryPageRoute = "/insert"

export function HousingEntryPage() {
    const methods = useForm<HousingInfo>();
    const onFormSubmit: SubmitHandler<HousingInfo> = async (data) => {
        const res = await post("/api/housing/create", data);
        if (res.ok) {
            alert("Housing Added Successfully");
        }
        else {
            const error = await res.json()
            alert(`Error: ${error.message}`)
        }
    }
    return (
        <div className="HousingEntryPageContainer">
            <FormProvider {...methods}>
                <HousingForm onFormSubmit={onFormSubmit} />
            </FormProvider>
        </div>
    )
}