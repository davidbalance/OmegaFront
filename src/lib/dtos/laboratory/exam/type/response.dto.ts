import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { ExamType } from "./base.response.dto";

export interface GetExamTypeResponseDto extends ExamType { }
export interface GetExamTypeArrayResponseDto extends ObjectArray<ExamType> { }