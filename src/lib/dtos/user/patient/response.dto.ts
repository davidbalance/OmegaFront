import { PaginationResponse } from "@/lib/interfaces/pagination.interface";
import { Patient, PatientEeq } from "./base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export interface GetPatientArrayResponseDto extends ObjectArray<Patient> { }

export interface PostPatientPagesnResponseDto {
    pages: number
}

export interface PostPatientEeqPaginationResponseDto extends PaginationResponse<PatientEeq> { }