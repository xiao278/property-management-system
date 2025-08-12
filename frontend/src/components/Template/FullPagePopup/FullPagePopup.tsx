import React, { JSX } from "react";
import "./FullPagePopup.css"

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
                    <button className="FppCloseButton" onClick={() => setShow(false)}>x</button>
                    {children}
                </div>
            }
        </>
    )
}