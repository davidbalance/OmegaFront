import { Order } from "@/lib/types/pagination.type";

export type Branch = {
    branchId: string;
    branchName: string;
    companyId: string;
    cityName: string;
}

export type BranchQuery = {
    companyId: string;
    filter?: string;
} & Order<Branch>;

export type BranchCreatePayload = {
    corporativeId: string;
    companyId: string;
    cityId: number;
    name: string;
}

export type BranchMovePayload = {
    fromCorporativeId: string;
    fromCompanyId: string;
    toCorporativeId: string;
    toCompanyId: string;
    branchId: string;
}

export type BranchRemovePayload = {
    corporativeId: string;
    companyId: string;
    branchId: string;
}