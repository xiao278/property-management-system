import { FieldValues, RegisterOptions, useFormContext, Controller } from "react-hook-form"
import "./FormInput.css"
import React, { JSX } from "react";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { AutocompleteProps } from "@mui/material";



interface FormInputProps {
    fieldName: string;
    hint: string;
    type: "text" | "number" | "date" | "mui";
    validation?: RegisterOptions<FieldValues, string>;
    children?: JSX.Element;
}

export function FormInput(props: FormInputProps) {
    const { hint, type, fieldName, validation, children } = props;
    const { register, control } = useFormContext();
    const placeholder = validation?.required ? undefined : "N/A"
    const renderChildren = () => {
        if (!children) return (<></>)
        switch (type) {
            case "number": return <Controller 
                    control={control}
                    name={fieldName}
                    defaultValue={""}
                    render={({ field: { onChange, value, ref }, formState, fieldState }) => (
                        React.cloneElement<NumericFormatProps>(children, {
                            value: value,
                            onValueChange: (values) => {onChange(values.floatValue)},
                            getInputRef: ref,
                            placeholder: placeholder,
                        })
                    )}
                    rules={validation}
                />
            case "mui": return <Controller 
                    control={control}
                    name={fieldName}
                    defaultValue={""}
                    render={({ field, formState, fieldState }) => (
                        React.cloneElement(children, {
                            ...field,
                            ...{placeholder: placeholder}
                        })
                    )}
                    rules={validation}
                />
            default: return <></>
        }
    }
    return (
        <div className="FormInputContainer">
            {children ? 
                renderChildren()
                : 
                <input className={"FormInput"} {...register(fieldName, validation)} type={type} placeholder={placeholder} />
            }

            <div className="FormInputName"> {hint}
                {(validation && validation.required) ? <span style={{color: "red"}}>*</span> : <></>}
            </div>
        </div>
    )
}