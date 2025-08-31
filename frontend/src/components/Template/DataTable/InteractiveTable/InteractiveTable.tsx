import { RefObject, useEffect, useRef, useState } from "react";
import { AuthOrHide } from "../../../Auth/AuthOrHide";
import { DataTable, DtBody, DtHeader, DtRow } from "../DataTable";
import { Button, Paper } from "@mui/material";
import "./InteractiveTable.css";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { FormInput } from "../../FormInput/FormInput";
import { CreateRowPanel } from "./CreateRowPanel";


type BasicRowType = {name: string};

interface TableRowDetailPageProps<T extends BasicRowType> {
    focusRow: T & BasicRowType | null;
    setFocusRow: (focusRow: TableRowDetailPageProps<T>['focusRow']) => void;
    overlayRef: RefObject<HTMLDivElement | null>;
    detailedFields: Partial<Record<keyof T, string>>
}

function TableRowDetailPage<T extends BasicRowType> (props: TableRowDetailPageProps<T>) {
    const { focusRow, setFocusRow, overlayRef, detailedFields } = props;
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const height = overlay.offsetHeight;
        overlay.style.top = `calc(50vh - ${height / 2}px)`;
    }, []);
    return (
        <div className="RoomDetailWrapper">
            <div className="RoomDetailContent" ref={overlayRef}>
                <Paper sx={{height: "100%", padding: "10px", position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", gap: "10px"}}>
                    <div className="RoomDetailRow"><h3>{focusRow?.name}</h3></div>
                    <div className="RoomDetailRow RoomDetailData">
                        {Object.entries(detailedFields).map(([fieldName, fieldDisplayName], index) => {
                            const realFieldname = fieldName as keyof T;
                            fieldDisplayName = fieldDisplayName as string;
                            return (
                                <div key={index}>{fieldDisplayName}: {!(focusRow == null || focusRow[realFieldname] == null) ? (focusRow[realFieldname] as string) : <span style={{color: "rgba(0,0,0,0.3)"}}>N/A</span>}</div>
                            )
                        })}
                    </div>
                    <Button sx={{position: "absolute", top: "5px", right: "5px", minWidth: 0}} onClick={() => setFocusRow(null)}><KeyboardReturnIcon sx={{height: "15px", width: "15px"}} /></Button>
                </Paper>
            </div>
        </div>
    )
}

export interface ItColumns {
    displayName: string;
    style?: React.CSSProperties;
    input?: React.ReactElement<React.ComponentProps<typeof FormInput>>;
}

interface InteractiveTableProps<T extends BasicRowType> {
    rows?: T[] | null;
    columns: Partial<Record<keyof T, ItColumns>>
    detailedFields: Partial<Record<keyof T, string>>
}


export function InteractiveTable<T extends BasicRowType>(props: InteractiveTableProps<T>) {
    const { rows, columns, detailedFields } = props;
    const [ focusRow, setFocusRow ] = useState<T | null>();
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
        <Paper elevation={3} sx={{padding: "10px", position: "relative"}} ref={paperRef}>
            <div className="RoomTableWrapper">
                { focusRow ? <TableRowDetailPage overlayRef={overlayRef} focusRow={focusRow} setFocusRow={setFocusRow} detailedFields={detailedFields}/> : <></>}
                <DataTable style={{borderCollapse: "separate", borderSpacing: "5px 10px"}}>
                    <colgroup>
                        <col style={{width: "12px"}}/>
                        {/* <col />
                        <col style={{minWidth: "60px", width: 0}}/> */}
                        <>
                            {Object.entries(columns).map(([fieldName, colProps], index) => {
                                const formattedColProps = colProps as ItColumns;
                                return (
                                    <col key={index} style={formattedColProps.style}/>
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