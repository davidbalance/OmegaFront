export type InsertMedicalReportRQ = {
    id: number;
    content: string;
}

export type FindMedicalResultAndUpdateRQ = {
    id: number;
    disease: number;
}