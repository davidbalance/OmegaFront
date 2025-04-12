import { root } from "@/lib/endpoints/config";

export const MANAGEMENT = {
    FIND_ALL: `${root}/management`,
    CREATE: `${root}/management`,
    UPDATE_ONE: (id: number) => `${root}/management/${id}`,
    DELETE_ONE: (id: number) => `${root}/management/${id}`,
}