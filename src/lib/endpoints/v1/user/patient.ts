import { root } from "../../config";

export const PATIENT = {
    FIND_ALL: `${root}/patients`,
    FIND_WITH_PAGINATION: `${root}/patients/paginate`,
    FIND_BY_COMPANY: `${root}/patients/look/company`,
    EEQ: {
        FIND_ALL: `${root}/patients/eeq`,
        FIND_WITH_PAGINATION: `${root}/patients/eeq/paginate`,
    }
}