import { Order } from "@/lib/types/pagination.type";

export type Exam = {
    examId: string;
    examName: string;
}

export type ExamQuery = {
    subtypeId: string;
    filter?: string;
} & Order<Exam>;

export type CreateExamPayload = {
    typeId: string;
    subtypeId: string;
    examName: string;
}

export type EditExamPayload = {
    typeId: string;
    subtypeId: string;
    examId: string;
    examName: string;
};

export type MoveExamPayload = {
    typeId: string;
    subtypeId: string;
    examId: string;
    toTypeId: string;
    toSubtypeId: string;
}