import { DiseaseAPI } from "..";
import { root } from "../config";

export const DiseaseEndpoint: DiseaseAPI = {
    FIND: `${root}/diseases`,
    CREATE: `${root}/diseases`,
    FIND_SELECTOR: `${root}/diseases/selector`,
    FIND_ONE_AND_UPDATE: (key: string) => `${root}/diseases/${key}`
}
