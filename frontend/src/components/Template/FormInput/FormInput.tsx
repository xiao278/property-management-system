import "./FormInput.css"

interface FormInputProps {
    name: string;
    type: "text" | "number" | "date"
    allowEmpty: boolean;
}

export function FormInput(props: FormInputProps) {
    const { name, type, allowEmpty } = props;
    return (
        <div className="FormInputContainer">
            <input className="FormInput" type={type} />
            <div className="FormInputName"> {name}
                {allowEmpty ? <></> : 
                    <span style={{color: "red"}}>*</span>
                }
            </div>
        </div>
    )
}