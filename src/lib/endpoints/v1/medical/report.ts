import { root } from "../../config";

export const MEDICAL_REPORT = {
    RECREATE_ALL_PDF: `${root}/medical/report/recreate/pdf`,
    RECREATE_ALL_PDF_BY_DNI: (key: string) => `${root}/medical/report/recreate/pdf/${key}`
}