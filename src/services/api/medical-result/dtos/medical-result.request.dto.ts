export type InsertMedicalReportRQ = {
    id: number;
    content: string;
}

export type UpdateMedicalResultRQ = {
    id: number;
    diseaseId: number;
    diseaseName: string;
    diseaseGroupId: number;
    diseaseGroupName: string;
}

export type FindMedicalResultFileRQ = {
    id: number;
    name: string;
}