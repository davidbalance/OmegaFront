import { root } from "../../config";

export const MEDICAL_RESULT = {
    DISEASE: {
        REPORT: `${root}/medical/result/disease/report`,
        YEAR: `${root}/medical/result/disease/year`,
        CREATE: `${root}/medical/results/diseases`,
        FIND_ALL: `${root}/medical/results/diseases`,
        FIND_ONE: (id: number) => `${root}/medical/results/diseases/${id}`,
        UPDATE_ONE: (id: number) => `${root}/medical/results/diseases/${id}`,
        DELETE_ONE: (id: number) => `${root}/medical/results/diseases/${id}`,
    },
    UPLOAD_FILE: (key: number) => `${root}/medical/results/file/${key}`,
    FIND_ALL: `${root}/medical/results`,
    FIND_ONE: (id: number) => `${root}/medical/results/${id}`,
    FIND_BY_DOCTOR: `${root}/medical/results/doctor`
}