import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { MedicalResult } from "./base.response.dto";

export interface GetMedicalResultResponseDto extends MedicalResult { }

export interface GetMedicalResultArrayResponseDto extends ObjectArray<MedicalResult> {}

export interface PatchMedicalResultResponseDto extends MedicalResult { }