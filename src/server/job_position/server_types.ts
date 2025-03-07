import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type JobPosition = {
    jobPositionId: string;
    jobPositionName: string;
}

export type JobPositionQuery = {
    filter?: string;
} & Order<JobPosition> & Pagination;

export type JobPositionOption = Option;