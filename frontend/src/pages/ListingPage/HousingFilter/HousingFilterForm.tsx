import { SmallCard } from "../../../components/Template/SmallCard/SmallCard";
import "./HousingFilterForm.css";
import { FormInput } from "../../../components/Template/FormInput/FormInput";
import { Checkbox, FormControlLabel, MenuItem, Select } from "@mui/material";
import { SelectCountry } from "../../../components/Template/FormInput/Implemented/SelectCountry";

export function HousingFilterForm() {
    return (
        <div className="HousingFilterFormContainer">
            <SmallCard title="Housing Type Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Location Filters">
                <SelectCountry fieldName="address.country_id" hint="Filter By Country" />
            </SmallCard>
            <SmallCard title="Miscellaneous Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Sorting Options">
                <FormInput fieldName="ordering.orderBy" hint="Ordering" type="mui">
                    <Select sx={{height: "30px"}} defaultValue={undefined}>
                        <MenuItem value={undefined}><em>None</em></MenuItem>
                        <MenuItem value="purchase_date">Purchase Date</MenuItem>
                        <MenuItem value="bathrooms">Num. Bathrooms</MenuItem>
                        <MenuItem value="bedrooms">Num. Bedrooms</MenuItem>
                        <MenuItem value="size">Unit Size</MenuItem>
                        <MenuItem value="countryName">Country</MenuItem>
                    </Select>
                </FormInput>
                <FormInput fieldName="ordering.ascending" type="mui">
                    <FormControlLabel control={<Checkbox />} label="Ascending" sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: "12px"
                        }
                    }} />
                </FormInput>
            </SmallCard>
            <button type="submit">Apply Filters</button>
            {/* <button type="button" onClick={() => reset()}>Reset Filters</button> */}
        </div>
    );
}