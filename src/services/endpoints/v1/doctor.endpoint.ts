import { DoctorAPI } from "..";
import { root } from "../config";

export const DoctorEndpoint: DoctorAPI = {
    FIND: `${root}/doctors`,
    FIND_ONE_AND_UPDATE_SIGNATURE: (key: string) => `${root}/doctors/signature/{key}`,
}