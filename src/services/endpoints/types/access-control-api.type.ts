export type AccessControlAPI = {
    FIND_ONE: (key: number) => string;
    FIND_ONE_AND_UPDATE_ROLES: (key: string) => string;
    FIND_ONE_AND_UPDATE_RESOURCES: (key: string) => string;
};