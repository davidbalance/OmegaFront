import { Exam } from "../base.response.dto";
import { ExamSubtype } from "../subtype/base.response.dto";

export interface ExamSubtypeOption extends ExamSubtype {
    exams: Exam[];
}
export interface ExamTypeOption extends ExamType {
    id: number;
    name: string;
    subtypes: ExamSubtypeOption[]
}

export interface ExamType {
    id: number;
    name: string;
}