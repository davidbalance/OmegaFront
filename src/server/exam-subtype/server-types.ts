import { Order, Pagination } from "@/lib/types/pagination.type";

export type ExamSubtype = {
    subtypeId: string;
    subtypeName: string;
    hasExams: boolean;
}

export type ExamSubtypeQuery = {
    typeId: string;
    filter?: string;
} & Order<ExamSubtype> & Pagination;

export type CreateExamSubtypePayload = {
    typeId: string;
    subtypeName: string;
}

export type EditExamSubtypePayload = {
    typeId: string;
    subtypeId: string;
    subtypeName: string;
};

export type RemoveExamSubtypePayload = {
    typeId: string;
    subtypeId: string;
};

export type MoveExamSubtypePayload = {
    typeId: string;
    subtypeId: string;
    toTypeId: string;
}