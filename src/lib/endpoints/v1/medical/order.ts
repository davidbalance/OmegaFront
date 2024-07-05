import { root } from "../../config";

export const MEDICAL_ORDER = {
    FIND_BY_PATIENT: (dni: string) => `${root}/medical/orders/patient/${dni}`,
    FIND_BY_PATIENT_AND_DOCTOR: (dni: string) => `${root}/medical/orders/patient/${dni}/doctor`,
    FIND_FILES: (key: number) => `${root}/medical/orders/files/${key}`,
    SEND_MAIL: `${root}/medical/orders/mail`
}