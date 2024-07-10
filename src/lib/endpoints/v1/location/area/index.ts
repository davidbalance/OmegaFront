import { root } from "@/lib/endpoints/config";

export const AREA = {
    FIND_ALL: `${root}/area`,
    CREATE: `${root}/area`,
    FIND_ONE_AND_UPDATE: (id: number) => `${root}/area/${id}`,
    FIND_ONE_AND_DELETE: (id: number) => `${root}/area/${id}`,
}