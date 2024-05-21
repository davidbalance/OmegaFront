import { SelectorOption } from "@/lib";

export type Company={
    id: number;
    ruc: string;
    name: string;
    address: string;
    phone: string;
}

export type FindCompanyRS = Company;

export type FindCompaniesRS = {
    companies: Company[];
}

export type FindSelectorOptionsCompany = {
    options: SelectorOption<number>[];
}