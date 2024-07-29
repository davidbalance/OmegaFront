import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { MedicalClient } from "./base.response.dto";


export interface GetMedicalClientResponseDto extends MedicalClient { }

export interface GetMedicalClientArrayResponseDto extends ObjectArray<MedicalClient> { }

export interface POSTMedicalClientResponseDto extends MedicalClient { }