import { root } from "@/lib/endpoints/config";

export const LAB_EXAM_TYPE = {
    CREATE: `${root}/exam/subtypes`,
    FIND_ALL: `${root}/exam/subtypes`,
    FIND_ONE: (id: number) => `${root}/exam/subtypes/${id}`,
    UPDATE_ONE: (id: number) => `${root}/exam/subtypes/${id}`,
    DELETE_ONE: (id: number) => `${root}/exam/subtypes/${id}`,
}