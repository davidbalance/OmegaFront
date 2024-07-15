import { root } from "../../config";

export const MEDICAL_CLIENT = {
    FIND_CLIENT_CLIENTS_BY_DOCTOR: `${root}/medical/client/doctor`,
    FIND_CLIENT_EMAIL: (dni: string) => `${root}/medical/client/${dni}/email`,
    CREATE_CLIENT_EMAIL: (dni: string) => `${root}/medical/client/${dni}/email`,
    FIND_CLIENT_BY_DNI_GET_MANAGEMENT_AREA: (dni: string) => `${root}/medical/client/${dni}/management/area`,
    FIND_CLIENT_BY_DNI_POST_MANAGEMENT_AREA: (dni: string) => `${root}/medical/client/${dni}/management/area`,
    FIND_CLIENT_BY_DNI_DELETE_MANAGEMENT_AREA: (dni: string) => `${root}/medical/client/${dni}/management/area`,
    SET_CLIENT_MAIL_DEFAULT: (dni: string, mail: number) => `${root}/medical/client/${dni}/email/${mail}`,
    DELETE_CLIENT_MAIL: (mail: number) => `${root}/medical/client/email/${mail}`,
}