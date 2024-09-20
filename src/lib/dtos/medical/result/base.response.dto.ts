export interface MedicalResult {
    id: number;
    examType: string;
    examSubtype: string;
    examName: string;
    hasFile: boolean;
    diseases?: string[];
    reportId?: number;
    reportHasFile?: boolean;
    orderHasFile?: boolean;
}