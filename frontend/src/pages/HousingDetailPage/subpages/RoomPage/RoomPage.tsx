import { Button, Paper } from "@mui/material";
import { CreateRoomPanel } from "./CreateRoomPanel";
import "./RoomPage.css"
import { DataTable, DtBody, DtHeader, DtRow } from "../../../../components/Template/DataTable/DataTable";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RoomAttributes } from "../../../../../../database/models/Rooms.model";
import { AuthOrHide } from "../../../../components/Auth/AuthOrHide";
import { post } from "../../../../api";
import { SearchHousingQueryResultFormatted } from "../../../../../../interface/HousingQuery";
import { RoomQueryResult, RoomSearchFilters} from "../../../../../../interface/RoomQuery";
import { RefObject, useEffect, useRef, useState } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface RoomDetailPageProps {
    focusRoom: RoomAttributes | null;
    setFocusRoom: (focusRoom: RoomDetailPageProps['focusRoom']) => void;
    overlayRef: RefObject<HTMLDivElement | null>;
}

function RoomDetailPage (props: RoomDetailPageProps) {
    const { focusRoom, setFocusRoom, overlayRef } = props;
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
                    <div className="RoomDetailRow"><h3>{focusRoom?.name}</h3></div>
                    <div className="RoomDetailRow RoomDetailData">
                        <div>Size: {focusRoom?.size == null ? "N/A" : focusRoom?.size}</div>
                        <div>Floor: {focusRoom?.floor == null ? "N/A" : focusRoom?.floor}</div>
                        <div>Notes: {focusRoom?.notes == null ? "N/A" : focusRoom?.notes}</div>
                    </div>
                    <Button sx={{position: "absolute", top: "5px", right: "5px", minWidth: 0}} onClick={() => setFocusRoom(null)}><KeyboardReturnIcon sx={{height: "15px", width: "15px"}} /></Button>
                </Paper>
            </div>
        </div>
    )
}

interface RoomPageProps {
    housingData: SearchHousingQueryResultFormatted
}

/**
 * sus
 * @param props 
 * @returns div
 */

export function RoomPage(props: RoomPageProps) {
    const { housingData } = props;
    const [ rooms, setRooms ] = useState<RoomQueryResult['rooms'] | null>();
    const [ focusRoom, setFocusRoom ] = useState<RoomAttributes | null>();
    const [ formData, setFormData ] = useState<RoomAttributes | null>();
    const paperRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const methods = useForm<RoomAttributes>({
        // defaultValues: {
        //     floor: undefined
        // }
    });
    const { handleSubmit, reset } = methods;
    const onFormSubmit: SubmitHandler<RoomAttributes> = async (data) => {
        data.housing_id = housingData.id;
        const floor = data.floor as (string | undefined | number);
        data.floor = floor === "" ? undefined : data.floor
        const res = await post("/api/room/create", data);
        if (res.ok) {
            reset();
            setFormData(data);
        }
        else {
            const error = await res.json();
            alert(`Failed to create: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchRoomData = async () => {
            const form: RoomSearchFilters = {
                housing_id: housingData.id
            }
            const res = await post("/api/room/fetch-rooms", form);
            if (res.ok) {
                const data = await res.json() as unknown as RoomQueryResult;
                setRooms(data.rooms);
            }
            else {
                const error = await res.json();
                alert(`Failed to fetch: ${error.message}`);
            }
        }
        fetchRoomData();
    }, [housingData.id, formData])

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
    }, [focusRoom]);

    return (
        <Paper elevation={3} sx={{padding: "10px", position: "relative"}} ref={paperRef}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="RoomTableWrapper">
                        { focusRoom ? <RoomDetailPage overlayRef={overlayRef} focusRoom={focusRoom} setFocusRoom={setFocusRoom}/> : <></>}
                        <DataTable style={{borderCollapse: "separate", borderSpacing: "5px 10px"}}>
                            <colgroup>
                                <col style={{width: "12px"}}/>
                                <col />
                                <col style={{minWidth: "60px", width: 0}}/>
                                <col style={{maxWidth: 0, width: 0}}/>
                            </colgroup>
                            <DtHeader>
                                <DtRow rowStyle={{}}>
                                    <div></div>
                                    <h5>Name</h5>
                                    <h5>Floor</h5>
                                </DtRow>
                            </DtHeader>
                            <DtBody>
                                <>
                                    { rooms ? 
                                        rooms.map((data, index) => {
                                            return (
                                                <DtRow key={index} rowStyle={{position: "relative"}}>
                                                    <div></div>
                                                    <div>{data.name}</div>
                                                    <div>{!(data.floor == null) ? data.floor : <span style={{color: "rgba(0,0,0,0.3)"}}>N/A</span>}</div>
                                                    <div className="RoomRowDisplay" onClick={() => {setFocusRoom(data)}}/>
                                                </DtRow>
                                            );
                                        })
                                    : <></>}
                                </>
                                <AuthOrHide adminOnly={true}>
                                    <CreateRoomPanel />
                                </AuthOrHide>
                            </DtBody>
                        </DataTable>
                    </div>
                </form>
            </FormProvider>
        </Paper>
    )
}