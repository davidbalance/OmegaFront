import { Branch } from "../branch.response.dto";
import { Company } from "../company.response.dto";

export interface CompanyOption extends Company {
    branches: Branch[];
}

export interface CorporativeGroupOption {
    id: number;
    name: string;
    companies: CompanyOption[];
}

export interface CorporativeGroup {
    id: number;
    name: string;
}