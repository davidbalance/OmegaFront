import { MedicalReport } from "../report/base.respoonse.dto";
import { MedicalResultDisease } from "./disease/base.response.dto";

export interface MedicalResult {
    id: number;
    examName: string;
    hasFile: boolean;
    diseases?: MedicalResultDisease[];
    report?: MedicalReport;
}