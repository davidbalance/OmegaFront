import { CompanyAPI } from "..";
import { root } from "../config";

export const CompanyEndpoint: CompanyAPI = {
    FIND: (key: string) =>  `${root}/companies/${key}`,
    FIND_SELECTOR: `${root}/companies/selector`
}