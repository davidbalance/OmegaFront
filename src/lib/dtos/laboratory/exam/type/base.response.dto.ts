import { ExamSubtype } from "../subtype/base.response.dto";

export interface ExamType {
    id: number;
    name: string;
    subtypes: ExamSubtype[]
}

export interface ExamTypeSingle {
    id: number;
    name: string;
}