import { JSX, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { DtRow } from "../DataTable";
import { FormInput, FormInputProps } from "../../FormInput/FormInput";
import "./CreateRowPanel.css"
import { Button } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { ItColumns } from "./InteractiveTable";

interface CreateRowPanelProps<T> {
    columns: Partial<Record<keyof T, ItColumns>>
    primaryColumn: keyof T;
}

export function CreateRowPanel<T> (props: CreateRowPanelProps<T>) {
    const { columns, primaryColumn } = props;
    const [ inUse, setInUse ] = useState(false);
    const n = Object.keys(columns).length;
    return (
        <>
            {inUse ? 
                <>
                    <DtRow colSpans={{0:n + 1}}><div style={{width: "100%", borderColor: "rgba(0,0,0,0.2)", borderTopStyle:"solid", marginTop: "5px", marginBottom: "5px"}}></div></DtRow>
                    <DtRow>
                        <div></div>
                        <>
                            {Object.entries(columns).map(([fieldName, colProps]) => {
                                const formattedColProps = colProps as ItColumns;
                                return (
                                    <div className={fieldName === primaryColumn ? "ItPrimaryColumn" : "ItSecondaryColumn"}>{formattedColProps.input ?? <></>}</div>
                                )
                            })}
                        </>
                    </DtRow>
                    <DtRow colSpans={{0:n + 1}}>
                        <div>
                            <Button variant="contained" type="submit">Add entry</Button>
                            <Button variant="text" type="button" onClick={() => setInUse(false)}> <CloseIcon /> </Button>
                        </div>
                    </DtRow>
                </>
                
            : 
                <DtRow colSpans={{0:n + 1}}>
                    <Button onClick={() => setInUse(true)} sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        boxSizing: "border-box",
                        width: "100%",
                    }}>
                        <AddIcon />
                        <div>
                            Add an entry
                        </div>     
                    </Button>
                </DtRow>
            }
        </>
    )
}