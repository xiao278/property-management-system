import React, { JSX } from 'react';
import "./SmallCard.css"
import { FlexWrapping } from '../FlexWrapping/FlexWrapping';

interface SmallCardProps {
    title?: string;
    children: JSX.Element | JSX.Element[]
}

export function SmallCard (props: SmallCardProps) {
    const { children, title } = props;
    return (
        <div className='ScContainer'>
            {title ? <h2>{title}</h2> : <></>}
            <FlexWrapping>
                {children}
            </FlexWrapping>
        </div>
    );
}