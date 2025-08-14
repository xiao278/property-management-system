import { CountryAttributes } from '../database/models/Addresses.model';
import { CurrencyQueryResult } from './miscQuery/CurrencyQuery';


/** fields required to create address */
interface AddressInfo {
    id?: number;
    building_name?: string | null;
    street_number?: string | null;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
}

/** fields required to create housing base */
interface HousingUnitInfo {
    id?: number;
    bathrooms: number;
    bedrooms: number;
    size: number;
    unit?: string | null;
    purchase_date: string;
    purchase_price: number;
    purchase_currency: string;
    address_id?: number;
}

/** fields required to create housing entry */
interface HousingInfo {
    housing: HousingUnitInfo
    address: AddressInfo
}

/** Result of Address Queries */
interface AddressQueryResult {
    id: number;
    building_name: string | null;
    street_number: string | null;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: CountryAttributes;
}

type AddressQueryResultFormatted = Omit<AddressQueryResult, "country"> & { country: string };

interface SearchHousingQueryResult {
    id: number;
    bathrooms: number;
    bedrooms: number;
    size: number;
    unit: string | null;
    purchase_date: string;
    purchase_price: string;
    currency: CurrencyQueryResult;
    address: AddressQueryResult;
}

type SearchHousingQueryResultFormatted = Omit<SearchHousingQueryResult, "purchase_price" | "currency" | "address" > & {
    purchase_price: number;
    purchase_currency: string;
    address: AddressQueryResultFormatted
};

interface HousingSearchResult {
    housingList: SearchHousingQueryResultFormatted[];
}

interface HousingSearchFilters {
    property_id?: number;
    bathrooms?: number;
    bedrooms?: number;
    size?: number;
    unit?: string;
    purchase_date?: string;
    purchase_price?: number;
    purchase_currency?: string;

    address?: AddressSearchFilters
    ordering?: OrderingOptions
}

interface OrderingOptions {
    orderBy?: "countryName" | "purchase_date" | "bathrooms" | "bedrooms" | "size"
    ascending: boolean
}

interface AddressSearchFilters {
    id?: number;
    building_name?: string;
    street_number?: string;
    street_name?: string;
    postal_code?: string;
    city?: string;
    state?: string;
    country_id?: number;
}

interface CountrySearchFilters {
    name: string;
}

interface CountryQueryResult {
    id: number;
    name: string;
}

interface CountrySearchResult {
    countryList: CountryQueryResult[];
}

export type { HousingInfo, AddressInfo, HousingUnitInfo,
    HousingSearchResult, SearchHousingQueryResult, SearchHousingQueryResultFormatted, 
    HousingSearchFilters,
    AddressSearchFilters, AddressQueryResult, AddressQueryResultFormatted,
    CountryQueryResult, CountrySearchFilters, CountrySearchResult,
    OrderingOptions };