import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { MedicalClientEmail } from "./base.response.dto";

export interface GetMedicalClientEmailResponseDto extends MedicalClientEmail { }

export interface GetMedicalClientEmailArrayResponseDto extends ObjectArray<MedicalClientEmail> { }

export interface PostMedicalClientEmailResponseDto extends MedicalClientEmail { }

export interface PatchMedicalClientEmailResponseDto extends MedicalClientEmail { }