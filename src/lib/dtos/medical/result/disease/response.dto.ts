import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { MedicalResultDisease, MedicalResultDiseaseYear } from "./base.response.dto";

export interface PostMedicalResultDiseaseResponseDto extends MedicalResultDisease { }

export interface GetMedicalResultDiseaseResponseDto extends MedicalResultDisease { }

export interface GetMedicalResultDiseaseArrayResponseDto extends ObjectArray<MedicalResultDisease> { }

export interface PatchMedicalResultDiseaseResponseDto extends MedicalResultDisease { }


export interface GetMedicalResultDiseaseYearResponseDto extends MedicalResultDiseaseYear { }

export interface GetMedicalResultDiseaseYearArrayResponseDto extends ObjectArray<MedicalResultDiseaseYear> { }