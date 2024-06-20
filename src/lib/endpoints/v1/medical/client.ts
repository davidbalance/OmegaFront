export const MEDICAL_CLIENT = {
    FIND_CLIENT_EMAIL: (dni: string) => `/medical/client/${dni}/email`,
    CREATE_CLIENT_EMAIL: (dni: string) => `/medical/client/${dni}/email`,
    SET_CLIENT_MAIL_DEFAULT: (dni: string, mail: number) => `/medical/client/${dni}/email/${mail}`,
    DELETE_CLIENT_MAIL: (mail: number) => `/medical/client/email/${mail}`,
}