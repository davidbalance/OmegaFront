import { OrderAPI } from "..";
import { root } from "../config";

export const OrderEndpoint: OrderAPI = {
    FIND_BY_DNI: (key: string) => `${root}/orders/patient/${key}`,
}