import { root } from "../../../config";

export const WEB_RESOURCE = {
    FIND_ALL: `${root}/omega/web/resources`,
    CREATE: `${root}/omega/web/resources`,
    UPDATE_ONE: (id:number) => `${root}/omega/web/resources/${id}`,
    DELETE_ONE: (id:number) => `${root}/omega/web/resources/${id}`,
}