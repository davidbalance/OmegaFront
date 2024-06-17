import { Company } from "../company.response.dto";

export interface CorporativeGroup {
    id: number;
    name: string;
    companies: Company[];
}

export interface GETCorporativeGroupDto {
    corporativeGroups: CorporativeGroup[];
}