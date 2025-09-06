import { JSX } from "react"
import "./DataTable.css"
import React from "react";
import flattenChildren from "react-keyed-flatten-children";


interface RowWrapperProps {
    children: JSX.Element | JSX.Element[];
    rowStyle?: React.CSSProperties
    className?: string;
    onClick?: () => void;
}

function RowWrapper(props: RowWrapperProps) {
    const {children, rowStyle, className, onClick} = props;
    return (
        <tr className={className} style={{...rowStyle}} onClick={onClick}>{children}</tr>
    )
}

interface DtRowProps {
    children: JSX.Element | JSX.Element[];
    colSpans?: { [key: number]: number };
    rowStyle?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export function DtRow(props: DtRowProps) {
    const {children, colSpans, rowStyle, className, onClick} = props;
    return (
        <RowWrapper className={className} rowStyle={rowStyle} onClick={onClick}>
            {flattenChildren(children).map((child, index) => {
                return (
                    <td key={index} {...{colSpan: (colSpans && colSpans[index]) ? colSpans[index] : undefined}}>
                        {child}
                    </td>
                )
            })}
        </RowWrapper>
    )
}


interface DtBodyProps {
    children: JSX.Element | JSX.Element[]
}

export function DtBody(props: DtBodyProps) {
    const {children} = props;
    return (
        <tbody>
            {/* {React.Children.map(children, (child, index) => {
                return (
                    <RowWrapper itemKey={index}>
                        {child}
                    </RowWrapper>
                )
            })} */}
            {children}
        </tbody>
    )
}

interface DtHeaderProps {
    children: JSX.Element | JSX.Element[]
}

export function DtHeader(props: DtHeaderProps) {
    const {children} = props;
    return (
        <thead>
            {/* {React.Children.map(children, (child, index) => {
                return (
                    <RowWrapper key={index}>
                        {child}
                    </RowWrapper>
                )
            })} */}
            {children}
        </thead>
    )
}

interface DataTableProps {
    children: JSX.Element | JSX.Element[];
    style: React.CSSProperties;
}

export function DataTable(props: DataTableProps) {
    const {children, style} = props;
    return (
        <table className="DataTable" style={style}>
            {children}
        </table>
    )
}