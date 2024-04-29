export type MedicalResultReport = {
    id: number;
    content: string;
    hasFile: boolean;
};

export type MedicalResultOrder = {
    patientFullname: string;
}

export type MedicalResult = {
    id: number;
    examName: string;
    diseaseId: number;
    diseaseName: string;
    order: MedicalResultOrder;
    report?: MedicalResultReport;
}

export type FindResultsRS = {
    results: MedicalResult[];
}

export type InsertMedicalReportRS = MedicalResult;