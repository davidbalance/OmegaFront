import { CredentialAPI, AuthenticationAPI, UserAPI, WebAppConfigurationAPI, RoleAPI } from "./endpoint.type";

const root: string = process.env.NEXT_PUBLIC_ROOT_API || 'localhost';

export default Object.freeze({
    AUTH: {
        V1: {
            LOGIN: `${root}/auth/login`,
            LOGOUT: `${root}/auth/logout`,
            REFRESH: `${root}/auth/refresh`,
        } as AuthenticationAPI
    },
    CREDENTIAL: {
        V1: {
            PASSWORD: `${root}/credential`
        } as CredentialAPI
    },
    USER: {
        V1: {
            CREATE: `${root}/users`,
            FIND: `${root}/users`,
            FIND_ONE: (id: number) => `${root}/users/${id}`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/users/${id}`,
            FIND_ONE_AND_INACTIVE: (id: number) => `${root}/users/${id}`,
        } as UserAPI
    },
    ROLE: {
        V1: {
            FIND: `${root}/roles`
        } as RoleAPI
    },
    CONFIGURATION: {
        V1: {
            CONFIGURATION: `${root}/omega-web/clients`
        } as WebAppConfigurationAPI
    }
});