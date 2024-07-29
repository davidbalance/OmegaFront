import { root } from "@/lib/endpoints/config";

export const JOB_POSITION = {
    CREATE: `${root}/job/position`,
    FIND_ALL: `${root}/job/position`,
    FIND_ONE: (id: number) => `${root}/job/position/${id}`,
    UPDATE_ONE: (id: number) => `${root}/job/position/${id}`,
    DELETE_ONE: (id: number) => `${root}/job/position/${id}`,
}