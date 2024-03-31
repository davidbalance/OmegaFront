import { CompanyAPI, ISelectorService } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindCompanySelectorOptions } from "./dtos";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";

export class CompanyService
    extends AbstractService<CompanyAPI>
    implements ISelectorService<any, number> {

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindCompanySelectorOptions = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }
}