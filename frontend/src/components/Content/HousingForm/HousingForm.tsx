import { SmallCard } from "../../Template/SmallCard/SmallCard"
import { FormInput } from "../../Template/FormInput/FormInput"
import "./HousingForm.css"

export function HousingForm() {
    return (
        <div className="HousingFormContainer">
            <div className="HfSection">
                <h2>Housing Details</h2>
                <SmallCard>
                    <div className="ClusteredInput">
                        <FormInput name="number of bathrooms" type="number" allowEmpty={false} />
                        <FormInput name="number of bedrooms" type="number" allowEmpty={false} />
                        <FormInput name="unit size (m^2)" type="number" allowEmpty={false} />
                    </div>
                    <div className="ClusteredInput">
                        <FormInput name="unit number" type="text" allowEmpty={true} />
                        <FormInput name="date of purchase" type="date" allowEmpty={false} />
                    </div>
                </SmallCard>
            </div>
            <div className="HfSection">
                <h2>Address</h2>
                <SmallCard>
                    {/* <div>building name</div>
                    <div>street no.</div>
                    <div>street name</div>
                    <div>city</div>
                    <div>state</div>
                    <div>postcode</div>
                    <div>country</div> */}
                    <FormInput name="building name" type="text" allowEmpty={true}/>
                    <div className="ClusteredInput">
                        <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                            <FormInput name="street number" type="text" allowEmpty={true}/>
                        </div>
                        <FormInput name="street name" type="text" allowEmpty={false}/>
                    </div>
                    <FormInput name="city" type="text" allowEmpty={false}/>
                    <div className="ClusteredInput">
                        <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                            <FormInput name="zip code" type="text" allowEmpty={false}/>
                        </div>
                        <FormInput name="state" type="text" allowEmpty={false}/>
                        <FormInput name="country" type="text" allowEmpty={false}/>
                    </div>
                </SmallCard>
            </div>
        </div>
    )
}