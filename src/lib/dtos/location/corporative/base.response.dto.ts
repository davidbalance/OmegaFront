import { Company } from "../company.response.dto";

export interface LocationResponse {
    id: number;
    name: string;
    companies: Company[];
}

export interface CorporativeGroup {
    id: number;
    name: string;
}