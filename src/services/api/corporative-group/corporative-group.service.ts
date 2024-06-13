import { CorporativeGroupAPI } from "@/lib/endpoints";
import { ISelectorService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { CorporativeGroup, FindCorporativeGroupsRS, FindSelectorOptionsCorporativeGroup} from "./dtos";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";

export class CorporativeGroupService
    extends AbstractService<CorporativeGroupAPI>
    implements ISelectorService<any, number> {

    async find(): Promise<CorporativeGroup[]> {
        try {
            const { groups }: FindCorporativeGroupsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return groups;
        } catch (error) {
            throw error;
        }
    }

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindSelectorOptionsCorporativeGroup = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }
}