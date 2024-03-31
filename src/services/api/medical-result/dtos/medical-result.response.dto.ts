export type MedicalResult = {
    id: number;
    examName: string;
    address: string;
    disease: string;
    report?: { id: number, content: string };
}

export type FindResultsRS = {
    results: MedicalResult[];
}

export type InsertMedicalReportRS = {
    result: MedicalResult;
}