import { Branch } from "@/services/api/branch/dtos";

export interface Company {
    id: number;
    ruc: string;
    name: string;
    address: string;
    phone: string;
    branches: Branch[];
}

export interface GETCompanyResponseDto {
    companies: Company[];
}