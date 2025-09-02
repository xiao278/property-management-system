import { RefObject, useEffect, useRef, useState } from "react";
import { AuthOrHide } from "../../../Auth/AuthOrHide";
import { DataTable, DtBody, DtHeader, DtRow } from "../DataTable";
import { Button, Paper } from "@mui/material";
import "./InteractiveTable.css";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { FormInput } from "../../FormInput/FormInput";
import { CreateRowPanel } from "./CreateRowPanel";

interface TableRowDetailPageProps<T extends object> {
    focusRow: T | null;
    setFocusRow: (focusRow: TableRowDetailPageProps<T>['focusRow']) => void;
    overlayRef: RefObject<HTMLDivElement | null>;
    detailedFields: Partial<Record<keyof T, string>>
    primaryField: keyof T;
}

function TableRowDetailPage<T extends object> (props: TableRowDetailPageProps<T>) {
    const { focusRow, setFocusRow, overlayRef, detailedFields, primaryField } = props;
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const height = overlay.offsetHeight;
        overlay.style.top = `calc(50vh - ${height / 2}px)`;
    }, []);

    const divRef = useRef<HTMLDivElement>(null);

    function handleClickOutside(event: MouseEvent) {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            dismissPopup();
        }
    };

    function dismissPopup() {
        setFocusRow(null);
        document.removeEventListener("mousedown", handleClickOutside);
    }

    useEffect(() => {
        if (focusRow) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [focusRow]);

    return (
        !focusRow ? <></> :
            <div className="RoomDetailWrapper">
                {/* <div style={{display: "fixed", height: "100vh", width: "100vw"}} /> */}
                <div className="RoomDetailContent" ref={overlayRef}>
                    <Paper sx={{height: "100%", padding: "10px", position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", gap: "10px"}} ref={divRef}>
                        <div className="RoomDetailRow"><h3>{String(focusRow[primaryField])}</h3></div>
                        <div className="RoomDetailRow RoomDetailData">
                            {Object.entries(detailedFields).map(([fieldName, fieldDisplayName], index) => {
                                const realFieldname = fieldName as keyof T;
                                return (
                                    <div key={index} style={{userSelect: "none"}}>{String(fieldDisplayName)}: {!(focusRow == null || focusRow[realFieldname] == null) ? (focusRow[realFieldname] as string) : <span style={{color: "rgba(0,0,0,0.3)"}}>N/A</span>}</div>
                                )
                            })}
                        </div>
                        <Button sx={{position: "absolute", top: "5px", right: "5px", minWidth: 0}} onClick={dismissPopup}><KeyboardReturnIcon sx={{height: "15px", width: "15px"}} /></Button>
                    </Paper>
                </div>
            </div>
    )
}

export interface ItColumns {
    displayName: string;
    columnStyle?: React.CSSProperties;
    input?: React.ReactElement<React.ComponentProps<typeof FormInput>>;
}

interface InteractiveTableProps<T extends object> {
    rows?: T[] | null;
    columns: Partial<Record<keyof T, ItColumns>>
    detailedFields: Partial<Record<keyof T, string>>
    primaryColumn: keyof T;
}


export function InteractiveTable<T extends object>(props: InteractiveTableProps<T>) {
    const { rows, columns, detailedFields, primaryColumn } = props;
    const [ focusRow, setFocusRow ] = useState<T | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const paperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const paper = paperRef.current;
        const overlay = overlayRef.current;
        if (!paper) return;
        if (!overlay) {
            paper.style.minHeight = "0";
            return;
        };
        const overlayHeight = overlay.offsetHeight;
        paper.style.minHeight = `${overlayHeight}px`;
    }, [focusRow]);
    return (
        <Paper elevation={3} sx={{padding: "10px", position: "relative", overflow: "hidden"}} ref={paperRef}>
            <div className="RoomTableWrapper">
                <TableRowDetailPage<T> overlayRef={overlayRef} focusRow={focusRow} setFocusRow={setFocusRow} detailedFields={detailedFields} primaryField={primaryColumn}/>
                <DataTable style={{borderCollapse: "separate", borderSpacing: "5px 10px"}}>
                    <colgroup>
                        <col style={{width: "12px"}}/>
                        {/* <col />
                        <col style={{minWidth: "60px", width: 0}}/> */}
                        <>
                            {Object.entries(columns).map(([fieldName, colProps], index) => {
                                const formattedColProps = colProps as ItColumns;
                                return (
                                    <col key={index} style={formattedColProps.columnStyle}/>
                                )
                            })}
                        </>
                        <col style={{maxWidth: 0, width: 0}}/>
                    </colgroup>
                    <DtHeader>
                        <DtRow rowStyle={{}}>
                            <div></div>
                            <>
                                {Object.entries(columns).map(([fieldName, colProps]) => {
                                    const formattedColProps = colProps as ItColumns;
                                    return (
                                        <h5>{formattedColProps.displayName}</h5>
                                    )
                                })}
                            </>
                            <div></div>
                        </DtRow>
                    </DtHeader>
                    <DtBody>
                        <>
                            { rows ? 
                                rows.map((data, index) => {
                                    return (
                                        <DtRow key={index} rowStyle={{position: "relative"}}>
                                            <div></div>
                                            <>
                                                {Object.entries(columns).map(([fieldName, colProps], index) => {
                                                    const realFieldname = fieldName as keyof T;
                                                    return (
                                                        <div key={index}>{!(data[realFieldname] == null) ? (data[realFieldname] as string) : <span style={{color: "rgba(0,0,0,0.3)"}}>N/A</span>}</div>
                                                    )
                                                })}
                                            </>
                                            <div className="RoomRowDisplay" onClick={() => {setFocusRow(data)}}/>
                                        </DtRow>
                                    );
                                })
                            : <></>}
                        </>
                        <AuthOrHide adminOnly={true}>
                            <CreateRowPanel<T> columns={columns} />
                        </AuthOrHide>
                    </DtBody>
                </DataTable>
            </div>
        </Paper>
    )
}