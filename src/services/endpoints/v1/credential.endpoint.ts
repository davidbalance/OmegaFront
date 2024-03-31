import { CredentialAPI } from "..";
import { root } from "../config";

export const CredentialEndpoint: CredentialAPI = {
    CREATE: `${root}/credentials`,
    FIND_ONE_AND_UPDATE_PASSWORD: `${root}/credentials`
}