import { root } from "../../config";

export const MEDICAL_RESULT = {
    FIND_ALL: `${root}/results`,
    FIND_BY_DOCTOR: `${root}/results/doctor`,
    FIND_ONE_AND_UPDATE_DISEASE: (key: number) => `${root}/results/${key}`,
    FIND_ONE_AND_ATTACH_REPORT: (key: number) => `${root}/results/report/${key}`
}