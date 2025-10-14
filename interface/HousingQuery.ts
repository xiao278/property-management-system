import { CountryAttributes } from '../database/models/Addresses.model';
import { HousingAttributes, HousingTypeAttributes } from '../database/models/Housings.model';
import { RenovationAttributes } from '../database/models/Renovations.model';
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
    housing_type: HousingTypeAttributes
    unit?: string | null;
    furnish: HousingAttributes['furnish'];
    purchase_date: string;
    purchase_price: number;
    purchase_currency: string;
    dues_per_m2?: number;
    address_id?: number;
    parking_lots: number;
    rent_price?: number;
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
    renovations: RenovationAttributes[];
    purchase_date: string;
    purchase_price: string;
    dues_per_m2: number | null;
    furnish: HousingAttributes['furnish'];
    currency: CurrencyQueryResult;
    address: AddressQueryResult;
    housing_type: HousingTypeAttributes;
    rent_price: number | null;
    parking_lots: number;
}

type SearchHousingQueryResultFormatted = Omit<SearchHousingQueryResult, "purchase_price" | "currency" | "address" | "renovation"> & {
    purchase_price: number;
    purchase_currency: string;
    address: AddressQueryResultFormatted;
    renovation_date: string | null;
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

interface CountryQueryResult {
    id: number;
    name: string;
}

interface CountrySearchResult {
    countryList: CountryQueryResult[];
}

interface HousingTypeQueryResult {
    id: number;
    name: string;
}

interface HousingTitleQueryResult {
    id: number;
    title: string;
}

export type { HousingInfo, AddressInfo, HousingUnitInfo,
    HousingSearchResult, SearchHousingQueryResult, SearchHousingQueryResultFormatted, 
    HousingSearchFilters,
    AddressSearchFilters, AddressQueryResult, AddressQueryResultFormatted,
    CountryQueryResult, CountrySearchResult,
    OrderingOptions,
    HousingTypeQueryResult,
    HousingTitleQueryResult
};