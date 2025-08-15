import { JSX } from "react"
import "./DataTable.css"
import React from "react";


interface RowWrapperProps {
    children: JSX.Element | JSX.Element[];
    rowStyle?: React.CSSProperties
}

function RowWrapper(props: RowWrapperProps) {
    const {children, rowStyle} = props;
    return (
        <tr className="DtRow" style={{...rowStyle}}>{children}</tr>
    )
}

interface DtRowProps {
    children: JSX.Element | JSX.Element[];
    colSpans?: { [key: number]: number };
    rowStyle?: React.CSSProperties;
}

export function DtRow(props: DtRowProps) {
    const {children, colSpans, rowStyle} = props;
    return (
        <RowWrapper rowStyle={rowStyle}>
            {React.Children.map(children, (child, index) => {
                return (
                    <td key={index} className="DtCell" {...{colSpan: (colSpans && colSpans[index]) ? colSpans[index] : undefined}}>
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
        <tbody className="DtBody">
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
        <thead className="DtHeader">
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