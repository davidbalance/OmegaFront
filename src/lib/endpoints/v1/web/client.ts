import { root } from "../../config";

export const WEB_CLIENT = {
    FIND: `${root}/omega/web/clients`,
    LOGO: {
        FIND_USER_AND_UPDATE_LOGO: (key: number) => `${root}/omega/web/clients/logo/${key}`
    },
    RESOURCE: {
        FIND_RESOURCES_BY_USER: (key: number) => `${root}/omega/web/clients/resource/${key}`,
        FIND_USER_AND_UPDATE_RESOURCES: (key: number) => `${root}/omega/web/clients/resource/${key}`,
    }
}