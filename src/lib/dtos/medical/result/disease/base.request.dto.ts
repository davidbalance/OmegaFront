import { MedicalResultDisease } from "./base.response.dto";

export interface MedicalResultDiseaseRequest extends Omit<MedicalResultDisease, 'id'> { }

export interface MedicalResultDiseaseReportRequest {
    year?: number;
    corporativeName?: string;
    companyRuc?: string;
}