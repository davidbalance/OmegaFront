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