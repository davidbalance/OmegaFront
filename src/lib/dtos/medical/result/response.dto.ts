export interface MedicalReport {
    id: number;
    content: string;
}

export interface MedicalResultDisease {
    id: number;
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
    diseaseCommentary: string;
}

export interface MedicalResult {
    id: number;
    examName: string;
    hasFile: boolean;
    diseases?: MedicalResultDisease[];
    report?: MedicalReport;
}

export interface GETMedicalResultsResponseDto {
    results: MedicalResult[];
}

export interface POSTMedicalResultDiseaseResponseDto extends MedicalResultDisease { }
export interface PATCHMedicalResultDiseaseResponseDto extends MedicalResultDisease { }

export interface PATCHMedicalResultReportResponseDto extends MedicalResult { }