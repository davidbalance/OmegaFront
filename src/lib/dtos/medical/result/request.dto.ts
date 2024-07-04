export interface PATCHMedicalResultWithDiseaseRequestDto {
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
    diseaseCommentary: string;
}

export interface PATCHMedicalResultReportRequestDto {
    content: string;
}