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

export type RoleAPI = {
    FIND: string;
}

export type WebAppConfigurationAPI = {
    CONFIGURATION: string;
}