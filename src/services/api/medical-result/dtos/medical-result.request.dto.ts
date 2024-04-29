export type InsertMedicalReportRQ = {
    id: number;
    content: string;
}

export type UpdateMedicalResultRQ = {
    id: number;
    diseaseId: number;
    diseaseName: string;
}