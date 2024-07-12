import { root } from "../../config";

export const MEDICAL_RESULT = {
    FIND_ALL: `${root}/medical/results`,
    FIND_BY_DOCTOR: `${root}/medical/results/doctor`,
    FIND_ONE_RESULT_AND_INSERT_DISEASE: (id: number) => `${root}/medical/results/${id}/diseases`,
    FIND_ONE_RESULT_AND_UPDATE_DISEASE: (id: number, disease: number) => `${root}/medical/results/${id}/diseases/${disease}`,
    FIND_ONE_RESULT_AND_DELETE_DISEASE: (id: number, disease: number) => `${root}/medical/results/${id}/diseases/${disease}`,
    FIND_ONE_AND_UPLOAD_FILE: (key: number) => `${root}/medical/results/file/${key}`,
    FIND_ONE_AND_ATTACH_REPORT: (key: number) => `${root}/medical/results/report/${key}`
}