import { root } from "../../config";

export const MEDICAL_ORDER = {
    FIND_BY_PATIENT: (dni: string) => `${root}/medical/orders/patient/${dni}`,
    FIND_BY_COMPANY: (ruc: string) => `${root}/medical/orders/company/${ruc}`,
    FIND_BY_PATIENT_AND_DOCTOR: (dni: string) => `${root}/medical/orders/patient/${dni}/doctor`,
    FIND_FILES: (key: number) => `${root}/medical/orders/files/${key}`,
    FIND_ONE_AND_VALIDATE_STATUS: (id: number) => `${root}/medical/orders/order/${id}/status/validate`,
    FIND_WITH_PAGINATION: `${root}/medical/orders/paginate`,
    SEND_MAIL: `${root}/medical/orders/mail`
}