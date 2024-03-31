import { BranchAPI, ISelectorService } from "@/services";
import { AbstractService } from "../abstract.service";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";
import { FindBranchSelectorOptions } from "./dtos";

export class BranchService
    extends AbstractService<BranchAPI>
    implements ISelectorService<any, number> {

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindBranchSelectorOptions = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }

}