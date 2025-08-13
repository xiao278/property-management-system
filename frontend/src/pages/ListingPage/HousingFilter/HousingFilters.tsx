import React from "react";
import { JSX } from "react";
import "./HousingFilters.css";
import { SmallCard } from "../../../components/Template/SmallCard/SmallCard";
import { HousingFilterForm } from "./HousingFilterForm";

function ToggleTab({children}: {children: JSX.Element | JSX.Element[]}) {
    const [show, setShow] = React.useState(true);
    return (
        <div className="ToggleTabContainer">
            <div className="ToggleTabButtonWrapper">
                <button type="button" className="ToggleTabButton" onClick={() => setShow(!show)}>
                                
                </button>
            </div>
            {show ? children : <></>}
        </div>
    );

}

export function HousingFilters() {
    return (
        <ToggleTab>
            <div className="HousingFiltersContainer">
                <HousingFilterForm />
            </div>
        </ToggleTab>
    );
}