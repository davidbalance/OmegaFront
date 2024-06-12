import { OrderAPI } from "..";
import { root } from "../config";

export const OrderEndpoint: OrderAPI = {
    SEND_MAIL: `${root}/orders/mail`,
    FIND_FILES_BY_ID: (key) => `${root}/orders/files/${key}`,
    FIND_BY_DNI: (key: string) => `${root}/orders/patient/${key}`,
}