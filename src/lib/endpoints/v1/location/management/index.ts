import { root } from "@/lib/endpoints/config";

export const MANAGEMENT = {
    FIND_ALL: `${root}/management`,
    CREATE: `${root}/management`,
    FIND_ONE_AND_UPDATE: (id: number) => `${root}/management/${id}`,
    FIND_ONE_AND_DELETE: (id: number) => `${root}/management/${id}`,
}