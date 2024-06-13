import { root } from "../../config";

export const USER = {
    FIND_ONE: `${root}/users/user`,
    FIND_ALL: `${root}/users`,
    CREATE: `${root}/users`,
    FIND_ONE_AND_UPDATE: (key: number) => `${root}/users/${key}`,
    FIND_ONE_AND_DELETE: (key: number) => `${root}/users/${key}`,
}