import React from "react";
import { JSX } from "react";
import "./HousingFilters.css";
import { SmallCard } from "../../../components/Template/SmallCard/SmallCard";
import { HousingFilterForm } from "./HousingFilterForm";

function ToggleTab({children}: {children: JSX.Element | JSX.Element[]}) {
    const [show, setShow] = React.useState(false);
    return (
        <div className={`ToggleTabContainer ${show ? "TabContainerShow" : "TabContainerHide"}`}>
            <div className={`ToggleTabButtonWrapper ${show ? "TabButtonRetracting" : "TabButtonExpanding"}`}>
                <button type="button" className="ToggleTabButton" onClick={() => setShow(!show)}>
                                
                </button>
            </div>
            <div className={`ToggleTabContentContainer`}>
                <div className="ToggleTabContentWrapper">
                    {children}
                </div>
            </div>
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