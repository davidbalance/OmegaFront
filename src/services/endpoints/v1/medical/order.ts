import { root } from "../../config";

export const MEDICAL_ORDER = {
    FIND_BY_PATIENT: (dni: string) => `${root}/orders/patient/${dni}`,
    FIND_FILE: (key: number) => `${root}/orders/files/${key}`,
}