import { MenuItem, Select, SxProps } from "@mui/material";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";
import { post } from "../../../../api";
import { CountryQueryResult, CountrySearchResult } from "../../../../../../interface/HousingQuery";

interface SelectCountryProps {
    sx?: SxProps | undefined;
    fieldName: string;
}

export function SelectCountry(props: SelectCountryProps) {
    const [ countries, setCountries ] = useState<CountryQueryResult[] | null>();
    const { sx, fieldName } = props

    const fetchCountries = async () => {
        const res = await post("/api/housing/fetch-countries", {});        
        if (res.ok) {
            const data = await res.json() as CountrySearchResult;
            setCountries(data.countryList);
        }
    }

    useEffect(() => {
        fetchCountries();
    })
    
    return (
        <FormInput fieldName={fieldName} hint="select country" type="mui">
            <Select sx={{height: "30px", ...{sx}}}>
                <MenuItem value={undefined}>
                    <em>None</em>
                </MenuItem>
                {countries ? countries.map((value, index) => (
                    <MenuItem value={value.country} key={index}>{value.country}</MenuItem>
                )
                ) : <></>}
            </Select>
        </FormInput>
    )
}