import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type Area = {
    areaId: string;
    areaName: string;
}

export type AreaOption = Option;

export type AreaQuery = {
    filter?: string;
} & Order<Area> & Pagination;

export type CreateAreaPayload = {
    name: string;
}

export type EditAreaPayload = {
    areaId: string;
    areaName: string;
};

export type RemoveAreaPayload = {
    areaId: string;
};