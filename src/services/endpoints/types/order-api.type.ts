export type OrderAPI = {
    SEND_MAIL: string;
    DOWNLOAD_SINGLE_FILE: string;
    DOWNLOAD_MULTIPLE_FILES_AS_ZIP: string;
    FIND_FILES_BY_ID: (key: number) => string;
    FIND_BY_DNI: (key: string) => string;
}