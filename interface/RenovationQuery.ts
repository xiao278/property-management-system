import { RenovationAttributes } from "../database/models/Renovations.model"

interface RenovationQueryResult {
    renovations: RenovationAttributes[]
}

export type { RenovationQueryResult }