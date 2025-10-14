import { MenuItem, Select, SxProps } from "@mui/material";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";
import { CountryQueryResult } from "../../../../../../interface/HousingQuery";
import { fetchCountries } from "../../../../apiCalls/country";
import { FieldValues, RegisterOptions } from "react-hook-form";

interface SelectionProps<T> {
    sx?: SxProps | undefined;
    fetchCallback: () => Promise<T[] | null>;
    required?: boolean;
    displayFromField: keyof T;
    fieldName: string;
    hint: string;
    validation?: RegisterOptions<FieldValues, string>;
    
}

export function Selection<T extends {id: number}>(props: SelectionProps<T>) {
    const [ entries, setEntries ] = useState<T[] | null>();
    const [ loaded, setLoaded ] = useState(false);
    const { sx, fieldName, hint, fetchCallback, displayFromField, required, validation } = props

    useEffect(() => {
        const loadEntries = async () => {
            const res = await fetchCallback();
            setEntries(res);
            setLoaded(true);
        }

        loadEntries();
    }, [])
    
    return (
        <FormInput fieldName={fieldName} hint={hint} type="mui" validation={{required: required, min: required ? 0 : undefined, ...validation}}>
            {
                loaded ?
                <Select sx={{height: "19.5px", ...sx}}>
                    {required ?
                        <MenuItem value={-2}>
                            <em>Please Select</em>
                        </MenuItem>
                        :
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                    }
                    {entries ? entries.map((value, index) => (
                        <MenuItem value={value.id} key={index}>{String(value[displayFromField])}</MenuItem>
                    )
                    ) : []}
                </Select>
                :
                <div>loading...</div>
            }
        </FormInput> 
    )
}