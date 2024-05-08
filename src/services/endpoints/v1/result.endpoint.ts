import { ResultAPI } from "..";
import { root } from "../config";

export const ResultEndpoint: ResultAPI = {
    FIND: `${root}/results/doctor`,
    FIND_FILE: (key: string) => `${root}/results/file/${key}`,
    FIND_ONE_AND_UPDATE_REPORT: (key: string) => `${root}/results/report/${key}`,
    FIND_ONE_AND_UPDATE_DISEASE: (key: string) => `${root}/results/${key}`,
}