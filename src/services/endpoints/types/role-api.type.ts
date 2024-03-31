export type RoleAPI = {
    FIND: string;
    CREATE: string;
    FIND_ONE_AND_UPDATE: (key: string) => string;
    FIND_ONE_AND_DELETE: (key: string) => string;
}