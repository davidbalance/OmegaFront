export type MedicalReport = { id: number, content: string; hasFile: boolean };

export type MedicalResult = {
    id: number;
    examName: string;
    address: string;
    disease: string;
    report?: MedicalReport;
}

export type FindResultsRS = {
    results: MedicalResult[];
}

export type InsertMedicalReportRS = {
    result: MedicalResult;
}