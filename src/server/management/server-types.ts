import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type Management = {
    managementId: string;
    managementName: string;
}

export type ManagementOption = Option;

export type ManagementQuery = {
    filter?: string;
} & Order<Management> & Pagination;

export type CreateManagementPayload = {
    name: string;
}

export type EditManagementPayload = {
    managementId: string;
    managementName: string;
};

export type RemoveManagementPayload = {
    managementId: string;
};