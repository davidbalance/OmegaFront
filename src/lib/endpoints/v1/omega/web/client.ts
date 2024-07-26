import { root } from "../../../config";

const baseUrl: string = 'omega/web/clients';

export const WEB_CLIENT = {
    FIND: `${root}/${baseUrl}`,
    LOGO: {
        UPDATE_ONE: (key: number) => `${root}/${baseUrl}/logos/${key}`
    },
    RESOURCE: {
        FIND_RESOURCES: (key: number) => `${root}/${baseUrl}/resources/resource/${key}`,
        UPDATE_RESOURCES: (key: number) => `${root}/${baseUrl}/resources/resource/${key}`,
    }
}