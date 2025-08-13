import { useFormContext } from "react-hook-form";
import { SmallCard } from "../../../components/Template/SmallCard/SmallCard";
import "./HousingFilterForm.css";
import { FormInput } from "../../../components/Template/FormInput/FormInput";
import { MenuItem, Select } from "@mui/material";
import { AddressSearchFilters } from "../../../../../interface/HousingQuery";
import { SelectCountry } from "../../../components/Template/FormInput/Implemented/SelectCountry";

export function HousingFilterForm() {
    return (
        <div className="HousingFilterFormContainer">
            <SmallCard title="Housing Type Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Location Filters">
                <SelectCountry fieldName="address.country" />
            </SmallCard>
            <SmallCard title="Miscellaneous Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Sorting Options">
                <div>Form content</div>
            </SmallCard>
            <button type="submit">Apply Filters</button>
        </div>
    );
}