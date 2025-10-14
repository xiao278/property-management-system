import { SubmitHandler, useFormContext } from "react-hook-form"
import { RentalInfo, TenantQueryResult } from "../../../../../../interface/RentalQuery";
import { FlexWrapping } from "../../../Template/FlexWrapping/FlexWrapping";
import { SmallCard } from "../../../Template/SmallCard/SmallCard";
import { FormInput } from "../../../Template/FormInput/FormInput";
import { PeriodTypeQueryResult } from "../../../../../../interface/RentalContractQuery";
import { Selection } from "../../../Template/FormInput/Implemented/Selection";
import { fetchPeriodTypes, fetchTenants } from "../../../../apiCalls/rentalContract";
import { NumericFormat } from "react-number-format";
import { CurrencyQueryResult } from "../../../../../../interface/miscQuery/CurrencyQuery";
import { fetchCurrencies } from "../../../../apiCalls/currency";
import { useState } from "react";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { fetchHousingTitles } from "../../../../apiCalls/housing";
import { HousingTitleQueryResult } from "../../../../../../interface/HousingQuery";

interface RentalFormProps {
    onSubmit: SubmitHandler<RentalInfo>;
}

export const rentalFormDefaultValues = {
    contract: {
        tenant_id: -1
    }
}

export function RentalForm(props: RentalFormProps) {
    const { onSubmit } = props;
    const { handleSubmit, reset } = useFormContext<RentalInfo>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="FormContainer">
                <SmallCard title="Rental Information">
                    <FlexWrapping minWidth={280}>
                        <Selection<HousingTitleQueryResult> fieldName="contract.housing_id" hint="Select Property" displayFromField="title" fetchCallback={fetchHousingTitles} required />
                        <FormInput fieldName="contract.start_date" hint="Start Date" type="date" validation={{required: true}} />
                        <Selection<PeriodTypeQueryResult> fieldName="contract.period_type_id" hint="Period Type" displayFromField="name" fetchCallback={fetchPeriodTypes} required />
                        <FormInput fieldName="contract.periods" hint="No. Periods" type="number" validation={{required: true}}>
                            <NumericFormat allowNegative={false} decimalScale={0} />
                        </FormInput>
                        <Selection<CurrencyQueryResult> fieldName="contract.currency_id" hint="Currency" displayFromField="name" fetchCallback={fetchCurrencies} required />
                        <FormInput fieldName="contract.rent" hint="Rent Amt." type="number" validation={{required: true}}>
                            <NumericFormat thousandSeparator={true} allowNegative={false} decimalScale={2} fixedDecimalScale={true} />
                        </FormInput>
                        <FormInput fieldName="contract.deposit" hint="Deposit Amt." type="number" validation={{required: true}}>
                            <NumericFormat thousandSeparator={true} allowNegative={false} decimalScale={2} fixedDecimalScale={true} />
                        </FormInput>
                        </FlexWrapping>
                </SmallCard>
                <TenantForm />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div className="HfbContainer">
                        <button type="submit" className="HousingFormButton">Submit</button>
                        <button type="button" className="HousingFormButton" onClick={() => reset()}>Clear</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

function TenantForm() {
    const [isCreating, setIsCreating] = useState(false);
    return (
        <SmallCard title="Tenant Information">
            <div style={{display: "flex", flexDirection: "row", gap: "12px"}}>
                <button type="button" style={{width: "150px"}} onClick={() => setIsCreating(!isCreating)}>
                    <SwapHorizIcon style={{verticalAlign: "middle", marginRight: "8px"}} />                    
                    {!isCreating ? "Create New": "Use Existing"}
                </button>
                {!isCreating ? <Selection<TenantQueryResult> fieldName="contract.tenant_id" fetchCallback={fetchTenants} displayFromField="name" hint="Select Tenant" required></Selection> : <></>}
            </div>
            <FlexWrapping minWidth={280}>
                <FormInput fieldName="tenant.name" hint="Full Name" type="text" validation={{required: true, disabled: !isCreating}} />
                <FormInput fieldName="tenant.email" hint="Email" type="text" validation={{required: false, disabled: !isCreating}} />
                <FormInput fieldName="tenant.phone" hint="Phone Number" type="text" validation={{required: false, disabled: !isCreating}} />
            </FlexWrapping>
        </SmallCard>
    )
}