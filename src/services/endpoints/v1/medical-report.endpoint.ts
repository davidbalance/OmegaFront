import { MedicalReportAPI } from "..";
import { root } from "../config";

export const MedicalReportEndpoint: MedicalReportAPI = {
    FIND_ONE_PDF: (key: string) => `${root}/medical-report/pdf/${key}`,
}