import { PaginationRequest } from "@/lib/interfaces/pagination.interface";
import { Patient, PatientEeq } from "./base.response.dto";

export interface PostPatientPaginationRequestDto extends PaginationRequest<Patient> { }

export interface PostPatientEeqPaginationRequestDto extends PaginationRequest<PatientEeq> { }