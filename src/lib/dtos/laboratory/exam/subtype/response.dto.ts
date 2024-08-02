import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { ExamSubtype } from "./base.response.dto";

export interface GetExamSubtypeResponseDto extends ExamSubtype { }

export interface GetExamSubtypeArrayResponseDto extends ObjectArray<ExamSubtype> { }

export interface PostExamSubtypeResponseDto extends ExamSubtype { }

export interface PatchExamSubtypeResponseDto extends ExamSubtype { }