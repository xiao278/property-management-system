interface HousingInfo {
    property_id?: number;
    bathrooms: number;
    bedrooms: number;
    size: number;
    unit: string;
    purchase_date: string;
    purchase_price: number;
    purchase_currency: string;
    
    address_id?: number;
    building_name: string;
    street_number: string;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
}

interface HousingQueryAddress {
    address_id: number;
    building_name: string | null;
    street_number: string | null;
    street_name: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
}

interface SearchHousingQueryResult {
    property_id: number;
    bathrooms: number;
    bedrooms: number;
    size: number;
    unit: string | null;
    purchase_date: string;
    purchase_price: string;
    purchase_currency: string;
    address: HousingQueryAddress;
}

type SearchHousingQueryResultFormatted = Omit<SearchHousingQueryResult, "purchase_price"> & {
    purchase_price: number;
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
}

interface AddressSearchFilters {
    address_id?: number;
    building_name?: string;
    street_number?: string;
    street_name?: string;
    postal_code?: string;
    city?: string;
    state?: string;
    country?: string;
}

interface CountrySearchFilters {
    country: string
}

interface CountryQueryResult {
    country: string;
}

interface CountrySearchResult {
    countryList: CountryQueryResult[];
}

export type { HousingInfo, HousingSearchResult, SearchHousingQueryResult, SearchHousingQueryResultFormatted, HousingQueryAddress, HousingSearchFilters, AddressSearchFilters, CountryQueryResult, CountrySearchFilters, CountrySearchResult };