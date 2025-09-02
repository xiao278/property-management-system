import { Button, Paper } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RoomAttributes } from "../../../../../../database/models/Rooms.model";
import { post } from "../../../../api";
import { SearchHousingQueryResultFormatted } from "../../../../../../interface/HousingQuery";
import { RoomQueryResult, RoomSearchFilters} from "../../../../../../interface/RoomQuery";
import { RefObject, useEffect, useRef, useState } from "react";
import { InteractiveTable } from "../../../../components/Template/DataTable/InteractiveTable/InteractiveTable";
import { FormInput } from "../../../../components/Template/FormInput/FormInput";
import { NumericFormat } from "react-number-format";

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

    return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <InteractiveTable<RoomAttributes> primaryColumn={"name"} columns={{
                        name: {displayName: "Room Name", input: <FormInput fieldName="name" type="text" hint="Room name" validation={{required: true}}/>}, 
                        size: {displayName: "Size", columnStyle: {minWidth: "60px", width: 0}, input: 
                            <FormInput containerStyle={{maxWidth: "55px"}} fieldName="size" type="number" hint="Size (m^2)" validation={{required: false}}>
                                <NumericFormat defaultValue={undefined}/>
                            </FormInput>
                        },
                    }} 
                    detailedFields={{size: "Size", floor: "Floor", notes: "Notes"}} 
                    rows={rooms} />
                </form>
            </FormProvider>
    )
}