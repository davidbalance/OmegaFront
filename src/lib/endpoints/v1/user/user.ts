import { root } from "../../config";

export const USER = {
    FIND_ALL: `${root}/users`,
    CREATE: `${root}/users`,
    FIND_ONE: `${root}/users/user`,
    FIND_ONE_AND_UPDATE: (key: number) => `${root}/users/${key}`,
    FIND_ONE_AND_DELETE: (key: number) => `${root}/users/${key}`,
    ATTRIBUTES: {
        LOOK_FOR: {
            FIND: (id: number) => `${root}/users/look/for/company/${id}`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/users/look/for/company/${id}`
        },
        EMPLOYEE: {
            FIND: (id: number) => `${root}/users/employee/${id}`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/users/employee/${id}`
        }
    }
}