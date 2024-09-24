import { root } from "@/lib/endpoints/config";

export const LAB_EXAM_TYPE = {
    CREATE: `${root}/exam/types`,
    FIND_ALL: `${root}/exam/types`,
    FIND_ONE: (id: number) => `${root}/exam/types/${id}`,
    UPDATE_ONE: (id: number) => `${root}/exam/types/${id}`,
    DELETE_ONE: (id: number) => `${root}/exam/types/${id}`,
}