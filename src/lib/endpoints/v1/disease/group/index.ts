import { root } from "@/lib/endpoints/config";

export const DISEASE_GROUP = {
    FIND: `${root}/diseases/groups`,
    CREATE: `${root}/diseases/groups`,
    UPDATE_ONE: (key: number) => `${root}/diseases/groups/${key}`,
    DELETE_ONE: (key: number) => `${root}/diseases/groups/${key}`,
}