import { DiseaseGroupAPI } from "..";
import { root } from "../config";

export const DiseaseGroupEndpoint: DiseaseGroupAPI = {
    FIND: `${root}/disease-groups`,
    CREATE: `${root}/disease-groups`,
    FIND_SELECTOR: `${root}/disease-groups/selector`,
    FIND_ONE_AND_UPDATE: (key: string) => `${root}/disease-groups/${key}`,
    FIND_ONE_AND_DELETE: (key: string) => `${root}/disease-groups/${key}`,
}