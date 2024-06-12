import { OrderAPI } from "..";
import { root } from "../config";

export const OrderEndpoint: OrderAPI = {
    SEND_MAIL: `${root}/orders/mail`,
    FIND_BY_DNI: (key: string) => `${root}/orders/patient/${key}`,
}