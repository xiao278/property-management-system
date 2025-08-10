import { Dispatch } from "react";
import "./FormInput.css"

interface FormInputProps {
    name: string;
    type: "text" | "number" | "date"
    allowEmpty: boolean;
    inputField: any;
    setInputField: (value: any) => void
}

export function FormInput(props: FormInputProps) {
    const { name, type, allowEmpty, inputField, setInputField } = props;
    return (
        <div className="FormInputContainer">
            <input className="FormInput" value={inputField} type={type} onChange={(e) => setInputField(e.target.value)} />
            <div className="FormInputName"> {name}
                {allowEmpty ? <></> : 
                    <span style={{color: "red"}}>*</span>
                }
            </div>
        </div>
    )
}