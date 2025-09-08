import { MenuItem, Select, SxProps } from "@mui/material";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";
import { CountryQueryResult } from "../../../../../../interface/HousingQuery";
import { fetchCountries } from "../../../../apiCalls/country";

interface SelectCountryProps {
    sx?: SxProps | undefined;
    fieldName: string;
    hint: string;
}

export function SelectCountry(props: SelectCountryProps) {
    const [ countries, setCountries ] = useState<CountryQueryResult[] | null>();
    const { sx, fieldName, hint } = props

    useEffect(() => {
        const loadCountries = async () => {
            const res = await fetchCountries();
            setCountries(res);
        }

        loadCountries();
    }, [])
    
    return (
        <FormInput fieldName={fieldName} hint={hint} type="mui">
            <Select sx={{height: "30px", ...{sx}}}>
                <MenuItem value={""}>
                    <em>None</em>
                </MenuItem>
                {countries ? countries.map((value, index) => (
                    <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                )
                ) : []}
            </Select>
        </FormInput>
    )
}