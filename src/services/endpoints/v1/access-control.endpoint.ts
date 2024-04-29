import { AccessControlAPI } from "..";
import { root } from "../config";

export const AccessControlEndpoint: AccessControlAPI = {
    FIND_ONE: (key: number) => `${root}/access-control/client/${key}`,
    FIND_ONE_AND_UPDATE_ROLES: (key: string) => `${root}/access-control/role/${key}`,
    FIND_ONE_AND_UPDATE_RESOURCES: (key: string) => `${root}/access-control/resource/${key}`
}