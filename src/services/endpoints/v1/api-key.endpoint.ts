import { ApiKeyAPI } from "..";
import { root } from "../config";

export const ApiKeyEndpoint: ApiKeyAPI = {
    CREATE: `${root}/api-key`,
}