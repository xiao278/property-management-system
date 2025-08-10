import React, { JSX } from 'react';
import "./SmallCard.css"

export function SmallCard ({ children }: { children: JSX.Element[] }) {
    return (
        <div className="SmallCardContainer">
            { React.Children.map(children, (child, index) => (
                <div key={index} className='SmallCardContainerContent'>
                    {child}
                </div>
            ))}
        </div>
    );
}