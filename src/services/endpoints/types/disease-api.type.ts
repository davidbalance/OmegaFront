export type DiseaseAPI = {
    FIND: string;
    CREATE: string;
    FIND_SELECTOR: string;
    FIND_ONE_AND_UPDATE: (key: string) => string;
}
