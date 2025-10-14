import { SmallCard } from "../../../Template/SmallCard/SmallCard"
import { FormInput } from "../../../Template/FormInput/FormInput"
import "./HousingForm.css"
import { SubmitHandler, useFormContext } from "react-hook-form";
import { HousingInfo, HousingTypeQueryResult } from "../../../../../../interface/HousingQuery";
import { NumericFormat } from 'react-number-format';
import { FlexWrapping } from "../../../Template/FlexWrapping/FlexWrapping";
import { useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import { Selection } from "../../../Template/FormInput/Implemented/Selection";
import { fetchPropertyTypes } from "../../../../apiCalls/propertyTypes";

interface HousingFormProps {
    onFormSubmit: SubmitHandler<HousingInfo>
    prefillData?: HousingInfo
}

export const housingFormDefaultValues = {
    housing: {
        dues_per_m2: NaN,
        housing_type: {id: undefined}
    }
}

export function HousingForm(props: HousingFormProps) {
    const { onFormSubmit, prefillData } = props;
    const { handleSubmit, reset } = useFormContext<HousingInfo>();

    useEffect(() => {
        reset(prefillData)
    }, []);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="FormContainer">
                <SmallCard title="Property Information">
                    <FlexWrapping minWidth={280}>
                        <FormInput fieldName="housing.unit" hint="Unit Number" type="text" />
                        <Selection<HousingTypeQueryResult> fieldName={"housing.housing_type.id"} hint="Unit Type" displayFromField="name" fetchCallback={fetchPropertyTypes} required/>
                        <FormInput fieldName="housing.bathrooms" hint="Bathrooms" type="number" validation={{required: true}}> 
                        <NumericFormat allowNegative={false} decimalScale={0} />
                        </FormInput>
                        <FormInput fieldName="housing.bedrooms" hint="Bedrooms" type="number" validation={{required: true}}>
                            <NumericFormat allowNegative={false} decimalScale={0} />
                        </FormInput>
                        <FormInput fieldName="housing.size" hint="Property Size (m²)" type="number" validation={{required: true}}>
                            <NumericFormat allowNegative={false} />
                        </FormInput>
                        <FormInput fieldName="housing.dues_per_m2" hint={`Monthly dues per m²`} type="number" validation={{required: false}}>
                            <NumericFormat thousandSeparator={true} allowNegative={false} decimalScale={2} fixedDecimalScale={true}/>
                        </FormInput>
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="housing.purchase_currency" hint="Currency" type="text" validation={{required: true}} />
                            </div>
                            <div style={{width: "100%"}}>
                                <FormInput fieldName="housing.purchase_price" hint="Purchase Price" type="number" validation={{required: true}}>
                                    <NumericFormat thousandSeparator={true} allowNegative={false} decimalScale={2} fixedDecimalScale={true}/>
                                </FormInput>
                            </div>
                        </div>
                        <FormInput fieldName="housing.purchase_date" hint="Date of Purchase" type="date" validation={{required: true}} />
                        <FormInput fieldName="housing.furnish" hint="Furnish Status" type="mui" validation={{required: true}}>
                            <Select sx={{height: "19.5px"}}>
                                <MenuItem value="Bare">Bare Furnishing</MenuItem>
                                <MenuItem value="Semi">Semi Furnished</MenuItem>
                                <MenuItem value="Fully">Fully Furnished</MenuItem>
                            </Select>
                        </FormInput>
                        <FormInput fieldName="housing.parking_lots" hint="Parking" type="number" validation={{required: true}}>
                            <NumericFormat allowNegative={false}/>
                        </FormInput>
                        <FormInput fieldName="housing.rent_price" hint="Monthly Rent" type="number" validation={{required: false}}>
                            <NumericFormat allowNegative={false} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}/>
                        </FormInput>
                    </FlexWrapping>
                </SmallCard>
                <SmallCard title="Address Information">
                    <FlexWrapping minWidth={280}>
                        <FormInput fieldName="address.building_name" hint="Building Name" type="text"/>
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="address.street_number" hint="Street No." type="text" />
                            </div>
                            <FormInput fieldName="address.street_name" hint="Street Name" type="text" validation={{required: true}} />
                        </div>
                        <FormInput fieldName="address.city" hint="City" type="text" validation={{required: true}} />
                        <div className="ClusteredInput">
                            <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                <FormInput fieldName="address.postal_code" hint="Zip Code" type="text" validation={{required: true}} />
                            </div>
                            <FormInput fieldName="address.state" hint="State" type="text" validation={{required: true}} />
                        </div>
                        <FormInput fieldName="address.country" hint="Country" type="text" validation={{required: true}} />
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
