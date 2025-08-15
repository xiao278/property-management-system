import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { DtRow } from "../../../../components/Template/DataTable/DataTable";
import { FormInput } from "../../../../components/Template/FormInput/FormInput";
import "./CreateRoomPanel.css"
import { Button } from "@mui/material";
import { NumericFormat } from "react-number-format";

export function CreateRoomPanel () {
    const [ inUse, setInUse ] = useState(false);
    return (
        <>
            {inUse ? 
                <>
                    <DtRow colSpans={{0:3}}><div style={{width: "100%", borderColor: "rgba(0,0,0,0.2)", borderTopStyle:"solid", marginTop: "5px", marginBottom: "5px"}}></div></DtRow>
                    <DtRow>
                        <div></div>
                        <FormInput fieldName="name" type="text" hint="Room name" validation={{required: true}}/>
                        <FormInput containerStyle={{maxWidth: "55px"}} fieldName="floor" type="number" hint="Room Floor" validation={{required: false}}>
                            <NumericFormat defaultValue={undefined}/>
                        </FormInput>
                    </DtRow>
                    <DtRow colSpans={{0:3}}>
                        <div>
                            <Button variant="contained" type="submit">Add Room</Button>
                            <Button variant="text" type="button" onClick={() => setInUse(false)}> <CloseIcon /> </Button>
                        </div>
                    </DtRow>
                </>
                
            : 
                <DtRow colSpans={{0:2}}>
                    <Button onClick={() => setInUse(true)} sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        boxSizing: "border-box",
                        width: "100%"
                    }}>
                        <AddIcon />
                        <div>
                            Add a room
                        </div>     
                    </Button>
                </DtRow>
            }
        </>
    )
}