import { BranchAPI } from "@/services/endpoints";
import { AbstractService } from "../abstract.service";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";
import { Branch, FindBranchesRS, FindBranchSelectorOptions } from "./dtos";
import { ISelectorService } from "@/services/interfaces";

export class BranchService
    extends AbstractService<BranchAPI>
    implements ISelectorService<any, number> {

    async find(company :string): Promise<Branch[]> {
        try {
            const { branches }: FindBranchesRS = await OmegaFetch.get({ url: this.endpoints.FIND(`${company}`) });
            return branches;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: FindBranchesRS): Branch | Promise<Branch> {
        throw new Error("Method not implemented.");
    }

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindBranchSelectorOptions = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }

}