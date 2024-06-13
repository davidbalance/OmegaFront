import { root } from "../../config";

export const DISEASE = {
    FIND: `${root}/diseases`,
    CREATE: `${root}/diseases`,
    FIND_ONE_AND_UPDATE: (key: number) => `${root}/diseases/${key}`,
    FIND_ONE_AND_DELETE: (key: number) => `${root}/diseases/${key}`,
}