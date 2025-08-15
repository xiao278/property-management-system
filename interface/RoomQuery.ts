import { RoomAttributes } from "../database/models/Rooms.model";

/** containing fields to identify set of rooms */
interface RoomSearchFilters {
    housing_id: number;
}

interface RoomQueryResult {
    rooms: RoomAttributes[];
}

export type {
    RoomSearchFilters, RoomQueryResult
}