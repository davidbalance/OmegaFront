import { root } from "../../config";

export const API_KEY = {
    FIND_ALL: `${root}/api-key`,
    CREATE: `${root}/api-key`,
    UPDATE: (key: number) => `${root}/api-key/${key}`,
}