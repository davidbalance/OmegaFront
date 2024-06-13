import { OrderAPI } from "..";
import { root } from "../config";

export const OrderEndpoint: OrderAPI = {
    SEND_MAIL: `${root}/orders/mail`,
    DOWNLOAD_SINGLE_FILE: `${root}/medical-result/file-downloader`,
    DOWNLOAD_MULTIPLE_FILES_AS_ZIP: `${root}/medical-result/file-downloader/multiple`,
    FIND_FILES_BY_ID: (key) => `${root}/orders/files/${key}`,
    FIND_BY_DNI: (key: string) => `${root}/orders/patient/${key}`,
}