export type ResultAPI = {
    FIND: string;
    FIND_FILE: (key: string) => string;
    FIND_ONE_AND_UPDATE_REPORT: (key: string) => string;
    FIND_ONE_AND_UPDATE_DISEASE: (key: string) => string;
}