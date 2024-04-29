import { AbstractService } from "../abstract.service";
import { FindCitySelectorOptionsRS } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { SelectorOption } from "@/lib";
import { CityAPI } from "@/services/endpoints";
import { ISelectorService } from "@/services/interfaces";

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