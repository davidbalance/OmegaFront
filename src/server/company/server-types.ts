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


export type CompanyCreatePayload = {
    corporativeId: string;
    name: string;
    ruc: string;
    address: string;
    phone: string;
}

export type CompanyMovePayload = {
    fromCorporativeId: string;
    toCorporativeId: string;
    companyId: string;
}

export type CompanyRemovePayload = {
    corporativeId: string;
    companyId: string;
}