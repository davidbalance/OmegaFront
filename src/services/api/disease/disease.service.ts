import {
    CreateDiseaseGroupRS,
    Disease,
    DiseaseAPI,
    ICreateService,
    IDeleteService,
    IFindService,
    ISelectorService,
    IUpdateService
} from "@/services";
import { AbstractService } from "../abstract.service";
import {
    CreateDiseaseRQ,
    CreateDiseaseRS,
    FindDiseaseAndDeleteQR,
    FindDiseaseAndUpdateRQ,
    FindDiseaseAndUpdateRS,
    FindDiseaseSelectorOptionRS,
    FindDiseasesRS
} from "./dtos";
import { OmegaFetch } from "@/services/config";
import { SelectorOption } from "@/lib";

export class DiseaseService
    extends AbstractService<DiseaseAPI>
    implements IFindService<any, Disease>,
    ICreateService<CreateDiseaseRQ, Disease>,
    IUpdateService<FindDiseaseAndUpdateRQ, Disease>,
    IDeleteService<FindDiseaseAndDeleteQR, void>,
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

    async create(params: CreateDiseaseRQ): Promise<Disease> {
        try {
            const { disease }: CreateDiseaseRS = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindDiseaseAndUpdateRQ): Disease | Promise<Disease> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindDiseaseAndUpdateRQ): Promise<Disease> {
        try {
            const { disease }: FindDiseaseAndUpdateRS = await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: FindDiseaseAndDeleteQR): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete({ id }: FindDiseaseAndDeleteQR): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`), });
        } catch (error) {
            throw error;
        }
    }
}