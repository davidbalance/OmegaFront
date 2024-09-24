import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { Disease } from "./base.response.dto";


export interface GetDiseaseResponseDto extends Disease { }

export interface GetDiseaseArrayResponseDto extends ObjectArray<Disease> {}

export interface PostDiseaseResponseDto extends Disease { }

export interface PatchDiseaseResponseDto extends Disease { }