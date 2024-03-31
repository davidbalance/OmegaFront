import { PatientAPI } from "..";
import { root } from "../config";

export const PatientEndpoint: PatientAPI = {
    FIND: `${root}/patients`,
}