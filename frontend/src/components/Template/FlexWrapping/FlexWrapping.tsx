import React from "react";
import { JSX } from "react";
import "./FlexWrapping.css"

interface FlexWrappingProps {
    children: JSX.Element | JSX.Element[]
    minWidth?: number; // Optional prop to set minimum width for children
    leniency?: number;
    subdivision?: number; // Optional prop to set the number of subdivisions
}

export function FlexWrapping(props:FlexWrappingProps) {
    const { children, minWidth, leniency, subdivision } = props;
    const actualMinWidth = minWidth || 360; 
    const actualLeniency = leniency || 25; 
    const actualSubdivision = subdivision || 2; 
    const basisWidthPercent = 100 / actualSubdivision;
    return (
        <div className="FlexContainer">
            { React.Children.map(children, (child, index) => (
                <div key={index} className='FlexContentWrapper' style={{
                    flex: `1 1 calc(${basisWidthPercent}% - ${actualLeniency}px)`,
                    minWidth: `${actualMinWidth}px`,
                }}>
                    {child}
                </div>
            ))}
        </div>
    )
}