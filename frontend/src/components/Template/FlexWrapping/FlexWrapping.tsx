import React from "react";
import { JSX } from "react";
import "./FlexWrapping.css"

interface FlexWrappingProps {
    children: JSX.Element | JSX.Element[]
}

export function FlexWrapping(props:FlexWrappingProps) {
    const { children } = props;
    return (
        <div className="FlexContainer">
            { React.Children.map(children, (child, index) => (
                <div key={index} className='FlexContentWrapper'>
                    {child}
                </div>
            ))}
        </div>
    )
}