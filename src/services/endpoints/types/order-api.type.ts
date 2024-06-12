export type OrderAPI = {
    SEND_MAIL: string;
    FIND_BY_ID: (key: number) => string;
    FIND_BY_DNI: (key: string) => string;
}