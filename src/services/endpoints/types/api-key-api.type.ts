export type ApiKeyAPI = {
    FIND: string;
    CREATE: string;
    FIND_ONE_AND_UPDATE: (key: string) => string;
    FIND_ONE_AND_DELETE: (key: string) => string;
}