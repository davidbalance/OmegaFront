import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type ExamType = {
    typeId: string;
    typeName: string;
    hasSubtypes: boolean;
}

export type ExamTypeOption = Option & {
    children: (Option & {
        children: Option[]
    })[]
}

export type ExamTypeQuery = {
    filter?: string;
} & Order<ExamType> & Pagination;