import { CredentialAPI, AuthenticationAPI, UserAPI } from "./endpoint.type";

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
            FIND_ONE: `${root}/users`,
            FIND_ONE_AND_UPDATE: `${root}/users`,
            FIND_ONE_AND_INACTIVE: `${root}/users`,
        } as UserAPI
    }
});