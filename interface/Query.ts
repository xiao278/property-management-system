interface HousingFormInput {
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

export type { HousingFormInput }