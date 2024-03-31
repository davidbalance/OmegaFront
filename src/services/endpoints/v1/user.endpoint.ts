import { UserAPI } from "..";
import { root } from "../config";

export const UserEndpoint: UserAPI = {
    FIND: `${root}/users`,
    CREATE: `${root}/users`,
    FIND_ONE_AND_UPDATE: (key: string) => `${root}/users/${key}`,
    FIND_ONE_AND_DELETE: (key: string) => `${root}/users/${key}`,
}