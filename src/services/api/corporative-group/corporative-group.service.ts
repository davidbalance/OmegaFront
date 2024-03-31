import { CorporativeGroupAPI, ISelectorService } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindCorporativeGroupSelectorOptions } from "./dtos";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";

export class CorporativeGroupService
    extends AbstractService<CorporativeGroupAPI>
    implements ISelectorService<any, number> {

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindCorporativeGroupSelectorOptions = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }
}