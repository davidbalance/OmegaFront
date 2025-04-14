import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type Corporative = {
    corporativeId: string;
    corporativeName: string;
    hasCompanies: boolean;
}

export type CorporativeQuery = {
    filter?: string;
} & Order<Corporative> & Pagination;

export type CompanyOption = Option & {
    children: Option[]
}

export type CorporativeOption = Option & {
    children: CompanyOption[]
}

export type CorporativeCreatePayload = {
    name: string;
}