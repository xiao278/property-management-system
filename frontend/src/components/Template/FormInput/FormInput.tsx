import { FieldValues, RegisterOptions, useFormContext, Controller } from "react-hook-form"
import "./FormInput.css"
import React from "react";
import { NumericFormat, NumericFormatProps } from 'react-number-format';



interface FormInputProps {
    fieldName: string;
    hint: string;
    type?: "text" | "number" | "date";
    validation?: RegisterOptions<FieldValues, string>;
    children?: React.ReactElement<NumericFormatProps>;
}

export function FormInput(props: FormInputProps) {
    const { hint, type, fieldName, validation, children } = props;
    const { register, control } = useFormContext();
    const placeholder = validation?.required ? undefined : "N/A"
    return (
        <div className="FormInputContainer">
            {children ? 
                <Controller 
                    control={control}
                    name={fieldName}
                    render={({ field: { onChange, value, ref }, formState, fieldState }) => (
                        React.cloneElement<NumericFormatProps>(children, {
                            value: value, // return updated value
                            onValueChange: (values) => {onChange(values.floatValue)},
                            getInputRef: ref,
                            placeholder: placeholder
                        })
                    )}
                    rules={validation}
                /> 
                : 
                <input className={"FormInput"} {...register(fieldName, validation)} type={type} placeholder={placeholder} />
            }
            <div className="FormInputName"> {hint}
                {(validation && validation.required) ? <span style={{color: "red"}}>*</span> : <></>}
            </div>
        </div>
    )
}