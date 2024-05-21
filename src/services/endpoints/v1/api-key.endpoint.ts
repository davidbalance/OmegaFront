import { ApiKeyAPI } from "../types/api-key-api.type";
import { root } from "../config";

export const ApiKeyEndpoint: ApiKeyAPI = {
    FIND: `${root}/api-key`,
    CREATE: `${root}/api-key`,
    FIND_ONE_AND_UPDATE: (key: string): string => `${root}/api-key/${key}`,
    FIND_ONE_AND_DELETE: (key: string): string => `${root}/api-key/${key}`,
}