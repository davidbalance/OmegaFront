import { root } from "../../config";

export const WEB_RESOURCE = {
    FIND_ALL: `${root}/omega/web/resources`,
    FIND_DEVELOPER_RESOURCES: `${root}/omega/web/resources/all`,
    CREATE_RESOURCES: `${root}/omega/web/resources`,
    UPDATE_RESOURCES: (id:number) => `${root}/omega/web/resources/${id}`,
    DELETE_RESOURCES: (id:number) => `${root}/omega/web/resources/${id}`,
}