import { PaginationResponse } from "@/lib/interfaces/pagination.interface";
import { Patient, PatientEeq } from "./base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export interface GetPatientArrayRespoonseDto extends ObjectArray<Patient> { }

export interface PostPatientPaginationResponseDto extends PaginationResponse<Patient> { }

export interface PostPatientEeqPaginationResponseDto extends PaginationResponse<PatientEeq> { }