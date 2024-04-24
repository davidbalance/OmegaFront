export type UserAPI = {
    FIND: string;
    CREATE: string;
    FIND_ONE: string;
    FIND_ONE_AND_UPDATE: (key: string) => string;
    FIND_ONE_AND_DELETE: (key: string) => string;
}