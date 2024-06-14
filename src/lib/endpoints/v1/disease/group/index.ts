import { root } from "@/lib/endpoints/config";

export const DISEASE_GROUP = {
    FIND: `${root}/disease-groups`,
    CREATE: `${root}/disease-groups`,
    FIND_ONE_AND_UPDATE: (key: number) => `${root}/disease-groups/${key}`,
    FIND_ONE_AND_DELETE: (key: number) => `${root}/disease-groups/${key}`,
}