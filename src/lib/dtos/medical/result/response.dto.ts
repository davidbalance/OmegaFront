export interface MedicalReport {
    id: number;
    content: string;
}

export interface MedicalResult {
    id: number;
    examName: string;
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
    hasFile: boolean;
    report?: MedicalReport;
}

export interface GETMedicalResultsResponseDto {
    results: MedicalResult[];
}

export interface PATCHMedicalResultReportResponseDto extends MedicalResult { }