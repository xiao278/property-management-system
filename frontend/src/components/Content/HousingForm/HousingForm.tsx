import { SmallCard } from "../../Template/SmallCard/SmallCard"
import { FormInput } from "../../Template/FormInput/FormInput"
import "./HousingForm.css"
import { SubmitHandler, useFormContext } from "react-hook-form";
import { HousingInfo } from "../../../../../interface/HousingQuery";
import { NumericFormat } from 'react-number-format';
import { FlexWrapping } from "../../Template/FlexWrapping/FlexWrapping";
import { useEffect } from "react";
import { Autocomplete } from "@mui/material";

interface HousingFormProps {
    onFormSubmit: SubmitHandler<HousingInfo>
    prefillData?: HousingInfo
}

export function HousingForm(props: HousingFormProps) {
    const { onFormSubmit, prefillData } = props;
    const { handleSubmit, reset } = useFormContext<HousingInfo>();

    useEffect(() => {
        reset(prefillData)
    }, []);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="HousingFormContainer">
                <SmallCard title="Housing Information">
                    <FlexWrapping>
                        <div className="ClusteredInput">
                            <FormInput fieldName="unit" hint="unit no." type="text" />
                            <FormInput fieldName="bathrooms" hint="bathrooms" type="number" validation={{required: true}}> 
                                <NumericFormat allowNegative={false} decimalScale={0} />
                            </FormInput>
                            <FormInput fieldName="bedrooms" hint="bedrooms" type="number" validation={{required: true}}>
                                <NumericFormat allowNegative={false} decimalScale={0} />
                            </FormInput>
                            <FormInput fieldName="size" hint="size (m^2)" type="number" validation={{required: true}}>
                                <NumericFormat allowNegative={false} />
                            </FormInput>
                        </div>
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="purchase_currency" hint="currency" type="text" validation={{required: true}} />

                            </div>
                            <div style={{width: "100%"}}>
                                <FormInput fieldName="purchase_price" hint="price" type="number" validation={{required: true}}>
                                    <NumericFormat thousandSeparator={true} allowNegative={false} decimalScale={2} fixedDecimalScale={true}/>
                                </FormInput>
                            </div>
                            <FormInput fieldName="purchase_date" hint="date of purchase" type="date" validation={{required: true}} />
                        </div>
                    </FlexWrapping>
                </SmallCard>
                <SmallCard title="Address Information">
                    <FlexWrapping>
                        <FormInput fieldName="building_name" hint="building name" type="text"/>
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="street_number" hint="street no." type="text" />
                            </div>
                            <FormInput fieldName="street_name" hint="street name" type="text" validation={{required: true}} />
                        </div>
                        <FormInput fieldName="city" hint="city" type="text" validation={{required: true}} />
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="postal_code" hint="zip code" type="text" validation={{required: true}} />
                            </div>
                            <FormInput fieldName="state" hint="state" type="text" validation={{required: true}} />
                            <FormInput fieldName="country" hint="country" type="text" validation={{required: true}} />
                        </div>
                    </FlexWrapping>
                </SmallCard>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div className="HfbContainer">
                        <button type="submit" className="HousingFormButton">Submit</button>
                        <button type="button" className="HousingFormButton" onClick={() => reset(prefillData)}>Clear</button>
                    </div>
                </div>
            </div>
        </form>
    )
}