import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { HousingFormInput } from "../../../../interface/Query";
import { HousingForm } from "../../components/Content/HousingForm/HousingForm"
import "./HousingEntryPage.css"
import { post } from "../../api";


export const housingEntryPageRoute = "/insert"

export function HousingEntryPage() {
    const methods = useForm<HousingFormInput>();
    const onFormSubmit: SubmitHandler<HousingFormInput> = async (data) => {
        await post("/api/housing/create", data);
    }
    return (
        <div className="HousingEntryPageContainer">
            <FormProvider {...methods}>
                <HousingForm onFormSubmit={onFormSubmit} />
            </FormProvider>
        </div>
    )
}