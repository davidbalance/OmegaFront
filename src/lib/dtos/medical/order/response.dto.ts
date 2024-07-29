import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { MedicalOrder, MedicalOrderCloud, MedicalOrderFlat } from "./base.response.dto";
import { PaginationResponse } from "@/lib/interfaces/pagination.interface";

export interface GetMedicalOrderCloudResponseDto extends MedicalOrderCloud { }

export interface GetMedicalOrderResponseDto extends MedicalOrder { }

export interface GetMedicalOrderArrayResponseDto extends ObjectArray<MedicalOrder> { }

export interface GetMedicalOrderFlatArrayResponseDto extends ObjectArray<MedicalOrderFlat> { }

export interface GetMedicalOrderFlatPaginationResponseDto extends PaginationResponse<MedicalOrderFlat> { }
