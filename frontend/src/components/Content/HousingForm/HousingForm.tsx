import { SmallCard } from "../../Template/SmallCard/SmallCard"
import { FormInput } from "../../Template/FormInput/FormInput"
import "./HousingForm.css"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

interface HousingFormInput {
    bathrooms: number;
    bedrooms: number;
    size: number;
    unit: string;
    purchase_date: string;
    purchase_price: number;
    purchase_currency: string;
    address_id: number;

    building_name: string;
    street_number: string;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
}

export function HousingForm() {
    const methods = useForm<HousingFormInput>();
    const { handleSubmit } = methods;
    const onFormSubmit: SubmitHandler<HousingFormInput> = (data) => console.log(data)

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="HousingFormContainer">
                    <div className="HfSection">
                        <h2>Housing Details</h2>
                        <SmallCard>
                            <div className="ClusteredInput">
                                <FormInput fieldName="unit" hint="unit no." type="text" />
                                <FormInput fieldName="bathrooms" hint="bathrooms" type="number" validation={{required: true}} />
                                <FormInput fieldName="bedrooms" hint="bedrooms" type="number" validation={{required: true}} />
                                <FormInput fieldName="size" hint="size (m^2)" type="number" validation={{required: true}} />
                            </div>
                            <div className="ClusteredInput">
                                <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                                    <FormInput fieldName="purchase_currency" hint="currency" type="text" validation={{required: true}} />
                                </div>
                                <div style={{width: "100%"}}>
                                    <FormInput fieldName="purchase_price" hint="price" type="number" validation={{required: true}} />
                                </div>
                                <FormInput fieldName="purchase_date" hint="date of purchase" type="date" validation={{required: true}} />
                            </div>
                        </SmallCard>
                    </div>
                    <div className="HfSection">
                        <div>
                            <h2>Address</h2>
                        </div>
                        <SmallCard>
                            <FormInput fieldName="building_name" hint="building name" type="text" />
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
                        </SmallCard>
                    </div>
                    <button type="submit" className="HfSection HousingFormSubmitButton">Submit</button>
                </div>
            </form>
        </FormProvider>
    )
}