import { root } from "../../config";

const baseUrl: string = 'medical/report';

export const MEDICAL_REPORT = {
    CREATE: `${root}/${baseUrl}`,
    UPLOAD_FILE: (id: number) => `${root}/${baseUrl}/file/${id}`,
    RECREATE_ALL_PDF: `${root}/${baseUrl}/recreate/pdf`,
    RECREATE_ALL_PDF_BY_DNI: (key: string) => `${root}/${baseUrl}/recreate/pdf/${key}`
}