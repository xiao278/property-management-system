import React, { JSX } from "react";
import "./FullPagePopup.css"
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";

interface FullPagePopupProps {
    children: JSX.Element | JSX.Element[];
    show: boolean;
    setShow: (show: boolean) => void;
}

export function FullPagePopup(props: FullPagePopupProps) {
    const { children, show, setShow } = props;
    return (
        <>
            {(!show) ? <></> : 
                <div className="FullPagePopupContainer">
                    <Button color="error" sx={{right: "20px", top: "20px", position: "fixed"}} onClick={() => setShow(false)}><CloseIcon color="error" sx={{width: "50px", height: "50px"}}/></Button>
                    {children}
                </div>
            }
        </>
    )
}