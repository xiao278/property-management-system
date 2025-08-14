import { CurrencyAttributes } from "../../database/models/Currencies.model";

interface CurrencyQueryResult extends CurrencyAttributes {
    id: number;
    name: string;
}

export type { CurrencyQueryResult }