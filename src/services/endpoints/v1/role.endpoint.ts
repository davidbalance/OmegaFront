import { RoleAPI } from "..";
import { root } from "../config";

export const RoleEndpoint: RoleAPI = {
    FIND: `${root}/roles`,
    CREATE: `${root}/roles`,
    FIND_ONE_AND_UPDATE: (key: string) => `${root}/roles/${key}`,
    FIND_ONE_AND_DELETE: (key: string) => `${root}/roles/${key}`,
}