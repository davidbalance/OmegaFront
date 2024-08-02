import { root } from "@/lib/endpoints/config";

export const AREA = {
    FIND_ALL: `${root}/area`,
    CREATE: `${root}/area`,
    UPDATE_ONE: (id: number) => `${root}/area/${id}`,
    DELETE_ONE: (id: number) => `${root}/area/${id}`,
}