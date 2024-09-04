import { Branch } from "./branch.response.dto";

export interface Company {
    id: number;
    ruc: string;
    name: string;
    address: string;
    phone: string;
    branches: Branch[];
}

export interface CompanySingle {
    id: number;
    ruc: string;
    name: string;
    address: string;
    phone: string;
}