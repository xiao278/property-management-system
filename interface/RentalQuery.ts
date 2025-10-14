import { PeriodTypeAttributes, RentalContractAttributes, TenantAttributes } from '../database/models/RentalContract.model';
import { QueryResult } from './QueryingGenerics';

interface RentalInfo {
    contract: RentalContractAttributes,
    tenant?: TenantAttributes,
}

interface RentalQueryResult {
    contract: QueryResult<RentalContractAttributes>,
    tenant: QueryResult<TenantAttributes>,
    period_type: QueryResult<PeriodTypeAttributes>,
}

type TenantQueryResult = QueryResult<TenantAttributes>;

export type { 
    RentalInfo, RentalQueryResult, 
    TenantQueryResult
};