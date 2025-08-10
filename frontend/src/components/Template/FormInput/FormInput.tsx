import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import "./FormInput.css"


interface FormInputProps {
    fieldName: string;
    hint: string;
    type: "text" | "number" | "date"
    validation?: RegisterOptions<FieldValues, string>;
}

export function FormInput(props: FormInputProps) {
    const { hint, type, fieldName, validation } = props;
    const { register } = useFormContext();
    return (
        <div className="FormInputContainer">
            <input className={"FormInput"} {...register(fieldName, validation)} type={type} />
            <div className="FormInputName"> {hint}
                {(validation && validation.required) ? <span style={{color: "red"}}>*</span> : <></>}
            </div>
        </div>
    )
}