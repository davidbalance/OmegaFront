import {
    DiseaseAPI,
    ICreateService,
    IFindService,
    ISelectorService,
    IUpdateService
} from "@/services";
import { AbstractService } from "../abstract.service";
import {
    CreateDiseaseRQ,
    Disease,
    FindDiseaseAndUpdateRQ,
    FindDiseaseSelectorOptionRS,
    FindDiseasesRS
} from "./dtos";
import { OmegaFetch } from "@/services/config";
import { SelectorOption } from "@/lib";

export class DiseaseService
    extends AbstractService<DiseaseAPI>
    implements IFindService<any, Disease>,
    ICreateService<CreateDiseaseRQ, void>,
    IUpdateService<FindDiseaseAndUpdateRQ, void>,
    ISelectorService<any, number> {

    async find(): Promise<Disease[]> {
        try {
            const { diseases }: FindDiseasesRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return diseases;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): Disease | Promise<Disease> {
        throw new Error("Method not implemented.");
    }

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindDiseaseSelectorOptionRS = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }

    async create(params: CreateDiseaseRQ): Promise<void> {
        try {
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindDiseaseAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindDiseaseAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }
}