import { DiseaseAPI } from "..";
import { root } from "../config";

export const DiseaseEndpoint: DiseaseAPI = {
    FIND: `${root}/diseases`,
    CREATE: `${root}/diseases`,
    FIND_SELECTOR: (key: string) => `${root}/diseases/selector/${key}`,
    FIND_ONE_AND_UPDATE: (key: string) => `${root}/diseases/${key}`,
    FIND_ONE_AND_DELETE: (key: string) => `${root}/diseases/${key}`,
}
