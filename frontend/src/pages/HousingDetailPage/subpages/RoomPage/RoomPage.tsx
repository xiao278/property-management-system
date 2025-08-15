import { Paper } from "@mui/material";
import { CreateRoomPanel } from "./CreateRoomPanel";
import "./RoomPage.css"
import { DataTable, DtBody, DtHeader, DtRow } from "../../../../components/Template/DataTable/DataTable";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RoomAttributes } from "../../../../../../database/models/Rooms.model";
import { AuthOrHide } from "../../../../components/Auth/AuthOrHide";
import { post } from "../../../../api";
import { SearchHousingQueryResultFormatted } from "../../../../../../interface/HousingQuery";
import { RoomQueryResult, RoomSearchFilters} from "../../../../../../interface/RoomQuery";
import { useEffect, useState } from "react";

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
    const [ formData, setFormData ] = useState<RoomAttributes | null>();
    const methods = useForm<RoomAttributes>({
        // defaultValues: {
        //     floor: undefined
        // }
    });
    const { handleSubmit, reset } = methods;
    const onFormSubmit: SubmitHandler<RoomAttributes> = async (data) => {
        data.housing_id = housingData.id;
        data.floor = Number(data.floor)
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
                console.log(data);
                setRooms(data.rooms);
            }
            else {
                const error = await res.json();
                alert(`Failed to fetch: ${error.message}`);
            }
        }
        fetchRoomData();
    }, [housingData.id, formData])

    return (
        <Paper elevation={3} sx={{padding: "10px"}}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="RoomTableWrapper">
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
                                                    <div>{data.floor ? data.floor : <span style={{color: "rgba(0,0,0,0.3)"}}>N/A</span>}</div>
                                                    <div style={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "10px"}} />
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