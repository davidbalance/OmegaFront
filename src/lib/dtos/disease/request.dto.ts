import { DiseaseRequest } from "./base.request.dto";

export interface PostDiseaseRequestDto extends DiseaseRequest { }

export interface PatchDiseaseRequestDto extends Partial<DiseaseRequest> { }