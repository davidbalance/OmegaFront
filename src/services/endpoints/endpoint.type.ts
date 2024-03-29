export type AuthenticationAPI = {
    LOGIN: string;
    REFRESH: string;
    LOGOUT: string;
}

export type CredentialAPI = {
    PASSWORD: string;
}

export type UserAPI = {
    FIND: string;
    FIND_ONE: (id: number) => string;
    FIND_ONE_AND_UPDATE: (id: number) => string;
    FIND_ONE_AND_INACTIVE: (id: number) => string;
    CREATE: string,
}

export type PatientAPI = {
    FIND: string;
}

export type DoctorAPI = {
    FIND: string;
}

export type RoleAPI = {
    CREATE: string;
    FIND: string;
    FIND_ONE_AND_UPDATE: (id: number) => string;
    FIND_ONE_AND_INACTIVE: (id: number) => string;
}

export type PermissionAPI = {
    FIND: string;
}

export type OrderAPI = {
    FIND: string;
    FIND_BY_DNI: (dni: string) => string;
}

export type ResultAPI = {
    FIND: string;
    FIND_ONE_AND_INSERT_MORBIDITY: (id: number) => string;
}

export type MorbidityGroupAPI = {
    CREATE: string;
    FIND: string;
    FIND_ONE_AND_UPDATE: (id: number) => string;
    FIND_ONE_AND_INACTIVE: (id: number) => string;
}

export type MorbidityAPI = {
    CREATE: string;
    FIND: string;
    FIND_ONE: (id: number) => string;
    FIND_ONE_AND_UPDATE: (id: number) => string;
    FIND_ONE_AND_INACTIVE: (id: number) => string;
}

export type MedicalReportAPI = {
    CREATE: string;
}

export type MedicalReportElementAPI = {
    FIND: string
}

export type WebAppConfigurationAPI = {
    CONFIGURATION: string;
}

export type ExamAPI = {
    FIND: string;
}