import { root } from "@/services/endpoints/config";

export const DISEASE_GROUP = {
    FIND: `${root}/diseases-groups`,
    CREATE: `${root}/diseases-groups`,
    FIND_ONE_AND_UPDATE: (key: number) => `${root}/diseases-groups/${key}`,
    FIND_ONE_AND_DELETE: (key: number) => `${root}/diseases-groups/${key}`,
}