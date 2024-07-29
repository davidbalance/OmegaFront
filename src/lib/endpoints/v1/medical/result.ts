import { root } from "../../config";

const baseUrl: string = 'medical/results';

export const MEDICAL_RESULT = {
    REPORT: {
        DISEASE: {
            EXPORT: `${root}/${baseUrl}/report/diseases`,   
            YEAR: `${root}/${baseUrl}/report/diseases/year`
        }
    },
    DISEASE: {
        CREATE: `${root}/${baseUrl}/diseases`,
        FIND_ALL: `${root}/${baseUrl}/diseases`,
        FIND_ONE: (id: number) => `${root}/${baseUrl}/diseases/${id}`,
        UPDATE_ONE: (id: number) => `${root}/${baseUrl}/diseases/${id}`,
        DELETE_ONE: (id: number) => `${root}/${baseUrl}/diseases/${id}`,
    },
    UPLOAD_FILE: (key: number) => `${root}/${baseUrl}/file/${key}`,
    FIND_ALL: `${root}/${baseUrl}`,
    FIND_ONE: (id: number) => `${root}/${baseUrl}/${id}`,
    FIND_BY_DOCTOR: `${root}/${baseUrl}/doctor`
}