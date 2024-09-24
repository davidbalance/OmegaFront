import { root } from "../../config";

export const DISEASE = {
    FIND: `${root}/diseases`,
    CREATE: `${root}/diseases`,
    UPDATE_ONE: (key: number) => `${root}/diseases/${key}`,
    DELETE_ONE: (key: number) => `${root}/diseases/${key}`,
}