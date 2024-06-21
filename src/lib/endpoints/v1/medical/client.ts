import { root } from "../../config";

export const MEDICAL_CLIENT = {
    FIND_CLIENT_EMAIL: (dni: string) => `${root}/medical/client/${dni}/email`,
    CREATE_CLIENT_EMAIL: (dni: string) => `${root}/medical/client/${dni}/email`,
    SET_CLIENT_MAIL_DEFAULT: (dni: string, mail: number) => `${root}/medical/client/${dni}/email/${mail}`,
    DELETE_CLIENT_MAIL: (mail: number) => `${root}/medical/client/email/${mail}`,
}