export interface POSTMedicalResultDiseaseRequestDto {
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
    diseaseCommentary: string;
}

export interface PATCHMedicalResultDiseaseRequestDto { }

export interface PATCHMedicalResultReportRequestDto {
    content: string;
}