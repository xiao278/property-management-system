import { HousingAttributes } from "../database/models/Housings.model";

type DatabaseType = {
    [key: string]: number | string | boolean | DatabaseType
}

type QueryResult<T> = {
    [K in keyof T]-?: undefined extends T[K]
        ? K extends "id" 
            ? T[K]
            : T[K] | null 
        : T[K];
}

type Listify<T> = {
    list: T[];
}

export type {QueryResult, Listify};