import { OmegaWebClientAPI } from "..";
import { root } from "../config";

export const OmegaWebClientEndpoint: OmegaWebClientAPI = {
    FIND_ONE: `${root}/omega-web/clients`,
    UPDATE_ONE_LOGO: (key: string) => `${root}/omega-web/clients/logo/${key}`,
}