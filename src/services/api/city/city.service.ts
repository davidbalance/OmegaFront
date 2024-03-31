import { CityAPI, ISelectorService } from "@/services";
import { AbstractService } from "../abstract.service";
import { SelectorOption } from "@/lib/type.lib";
import { FindCitySelectorOptionsRS } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class CityService
    extends AbstractService<CityAPI>
    implements ISelectorService<any, number> {

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindCitySelectorOptionsRS = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }
}