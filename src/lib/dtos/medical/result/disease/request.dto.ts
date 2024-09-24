import { MedicalResultDiseaseReportRequest, MedicalResultDiseaseRequest } from "./base.request.dto";

export interface PostMedicalResultDiseaseRequestDto extends MedicalResultDiseaseRequest {
    medicalResultId: number
}

export interface PatchMedicalResultDiseaseRequestDto extends MedicalResultDiseaseRequest { }

export interface PostMedicalResultDiseaseReportRequestDto extends MedicalResultDiseaseReportRequest { }