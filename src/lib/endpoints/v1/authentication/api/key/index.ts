import { root } from "@/lib/endpoints/config";

export const API_KEY = {
    FIND_ALL: `${root}/api/key`,
    CREATE: `${root}/api/key`,
    UPDATE_ONE: (key: number) => `${root}/api/key/${key}`,
}