import { SmallCard } from "../../Template/SmallCard/SmallCard"
import { FormInput } from "../../Template/FormInput/FormInput"
import "./HousingForm.css"
import { useState } from "react";

export function HousingForm() {
    const [unit, setUnit] = useState<string | null>();
    const [bathrooms, setBathrooms] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [size, setSize] = useState(0);
    const [currency, setCurrency] = useState('');
    const [price, setPrice] = useState(0);
    const [purchaseDate, setPurchaseDate] = useState<string>(new Date().toISOString().substring(0,10))

    const [buildingName, setBuildingName] = useState<string | null>();
    const [streetNumber, setStreetNumber] = useState<string | null>();
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    return (
        <div className="HousingFormContainer">
            <div className="HfSection">
                <h2>Housing Details</h2>
                <SmallCard>
                    <div className="ClusteredInput">
                        <FormInput name="unit no." type="text" allowEmpty={true} inputField={unit} setInputField={setUnit} />
                        <FormInput name="bathrooms" type="number" allowEmpty={false} inputField={bathrooms} setInputField={setBathrooms} />
                        <FormInput name="bedrooms" type="number" allowEmpty={false} inputField={bedrooms} setInputField={setBedrooms} />
                        <FormInput name="size (m^2)" type="number" allowEmpty={false} inputField={size} setInputField={setSize} />
                    </div>
                    <div className="ClusteredInput">
                        <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                            <FormInput name="currency" type="text" allowEmpty={false} inputField={currency} setInputField={setCurrency} />
                        </div>
                        <div style={{width: "100%"}}>
                            <FormInput name="price" type="number" allowEmpty={false} inputField={price} setInputField={setPrice} />
                        </div>
                        <FormInput name="date of purchase" type="date" allowEmpty={false} inputField={purchaseDate} setInputField={setPurchaseDate} />
                    </div>
                </SmallCard>
            </div>
            <div className="HfSection">
                <h2>Address</h2>
                <SmallCard>
                    <FormInput name="building name" type="text" allowEmpty={true} inputField={buildingName} setInputField={setBuildingName}/>
                    <div className="ClusteredInput">
                        <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                            <FormInput name="street no." type="text" allowEmpty={true} inputField={streetNumber} setInputField={setStreetNumber}/>
                        </div>
                        <FormInput name="street name" type="text" allowEmpty={false} inputField={streetName} setInputField={setStreetName}/>
                    </div>
                    <FormInput name="city" type="text" allowEmpty={false} inputField={city} setInputField={setCity}/>
                    <div className="ClusteredInput">
                        <div style={{width: "100%", maxWidth:"60px", minWidth:"0"}}>
                            <FormInput name="zip code" type="text" allowEmpty={false} inputField={zip} setInputField={setZip}/>
                        </div>
                        <FormInput name="state" type="text" allowEmpty={false} inputField={state} setInputField={setState}/>
                        <FormInput name="country" type="text" allowEmpty={false} inputField={country} setInputField={setCountry}/>
                    </div>
                </SmallCard>
            </div>
            <button className="HfSection HousingFormSubmitButton">Submit</button>
        </div>
    )
}