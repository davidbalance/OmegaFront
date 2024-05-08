import { CompanyAPI } from "@/services/endpoints";
import { AbstractService } from "../abstract.service";
import { Company, FindCompaniesRS, FindSelectorOptionsCompany } from "./dtos";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";
import { ISelectorService } from "@/services/interfaces";

export class CompanyService
    extends AbstractService<CompanyAPI>
    implements ISelectorService<any, number> {

    async find({ group }:any): Promise<Company[]> {
        try {
            const { companies }: FindCompaniesRS = await OmegaFetch.get({ url: this.endpoints.FIND(`${group}`) });
            return companies;
        } catch (error) {
            throw error;
        }
    }

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindSelectorOptionsCompany = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }
}