import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RentalForm, rentalFormDefaultValues } from "../../../../components/Content/Forms/RentalForm/RentalForm";
import { RentalInfo } from "../../../../../../interface/RentalQuery";
import { createRentalContract } from "../../../../apiCalls/rentalContract";

export const rentalEntryPageExtension = "create-rental";

export function RentalEntryPage() {
    const methods = useForm({
        defaultValues: rentalFormDefaultValues
    });
    const onFormSubmit: SubmitHandler<RentalInfo> = async (data) => {
        await createRentalContract(data);
    }
    return (
        <div className="DataEntryPageContainer">
            <FormProvider {...methods}>
                <RentalForm onSubmit={onFormSubmit} />
            </FormProvider>
        </div>
    )
}