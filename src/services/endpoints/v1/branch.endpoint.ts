import { BranchAPI } from "..";
import { root } from "../config";

export const BranchEndpoint: BranchAPI = {
    FIND: (key: string) =>  `${root}/branches/${key}`,
    FIND_SELECTOR: `${root}/branches/selector`
}