import { root } from "../../config";

const urlBase: string = 'medical/orders'

export const MEDICAL_ORDER = {
    CLOUD: (order: number) => `${root}/${urlBase}/cloud/${order}`,
    MAIL: `${root}/${urlBase}/mail`,
    FIND_BY_PATIENT: (dni: string) => `${root}/${urlBase}/patient/${dni}`,
    FIND_BY_PATIENT_AND_DOCTOR: (dni: string) => `${root}/${urlBase}/patient/${dni}/doctor`,
    FIND_ONE_AND_VALIDATE_STATUS: (id: number) => `${root}/${urlBase}/${id}/status/validate`,
    FIND_ONE_AND_CREATED_STATUS: (id: number) => `${root}/${urlBase}/${id}/status/created`,
    FIND_WITH_PAGINATION: `${root}/${urlBase}/paginate`,
}