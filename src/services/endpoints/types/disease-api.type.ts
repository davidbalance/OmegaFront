export type DiseaseAPI = {
    FIND: string;
    CREATE: string;
    FIND_SELECTOR: (key: string) => string;
    FIND_ONE_AND_UPDATE: (key: string) => string;
    FIND_ONE_AND_DELETE: (key: string) => string;
}
