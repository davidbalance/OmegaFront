export interface PATCHMedicalResultWithDiseaseRequestDto {
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
}

export interface PATCHMedicalResultReportRequestDto {
    content: string;
}

export interface POSTMedicalResultFileRequestDto {
    id: number;
    type: 'report' | 'result',
}

export interface POSTMedicalResultFilesRequestDto {
    files: POSTMedicalResultFileRequestDto[];
}