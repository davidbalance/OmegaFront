import { root } from "../../config";

export const MEDICAL_RESULT = {
    FIND_ALL: `${root}/medical/results`,
    FIND_BY_DOCTOR: `${root}/medical/results/doctor`,
    FIND_ONE_AND_UPDATE_DISEASE: (key: number) => `${root}/medical/results/${key}`,
    FIND_ONE_AND_UPLOAD_FILE: (key: number) => `${root}/medical/results/file/${key}`,
    FIND_ONE_AND_ATTACH_REPORT: (key: number) => `${root}/medical/results/report/${key}`
}