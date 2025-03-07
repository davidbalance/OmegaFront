import { Order, Pagination } from "@/lib/types/pagination.type";

export type Company = {
    companyId: string;
    companyRuc: string;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    hasBranches: boolean;
}

export type CompanyQuery = {
    corporativeId: string;
    filter?: string;
} & Order<Company> & Pagination;