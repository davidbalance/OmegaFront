import { Exam } from "../base.response.dto";

export interface ExamSubtype {
    id: number;
    name: string;
    exams: Exam[];
}