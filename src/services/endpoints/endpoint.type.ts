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
    FIND_ONE: string;
    FIND_ONE_AND_UPDATE: string;
    FIND_ONE_AND_INACTIVE: string;
    CREATE: string,
}

export type WebAppConfigurationAPI = {
    CONFIGURATION: string;
}