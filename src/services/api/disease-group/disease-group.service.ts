import { DiseaseGroupAPI, ICreateService, IDeleteService, IFindService, ISelectorService, IUpdateService } from "@/services";
import { AbstractService } from "../abstract.service";
import { CreateDiseaseGroupRQ, CreateDiseaseGroupRS, DiseaseGroup, FindDiseaseGroupAndDeleteRQ, FindDiseaseGroupAndUpdateRQ, FindDiseaseGroupsRS } from "./dtos";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";
import { FindDiseaseSelectorOptionRS } from "../disease";

export class DiseaseGroupService
    extends AbstractService<DiseaseGroupAPI>
    implements IFindService<any, DiseaseGroup>,
    ISelectorService<any, number>,
    ICreateService<CreateDiseaseGroupRQ, DiseaseGroup>,
    IUpdateService<FindDiseaseGroupAndUpdateRQ, void>,
    IDeleteService<FindDiseaseGroupAndDeleteRQ, void> {

    async find(): Promise<DiseaseGroup[]> {
        try {
            const { diseaseGroups }: FindDiseaseGroupsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return diseaseGroups;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): DiseaseGroup | Promise<DiseaseGroup> {
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

    async create(params: CreateDiseaseGroupRQ): Promise<DiseaseGroup> {
        try {
            const { disease }: CreateDiseaseGroupRS = await OmegaFetch.post({ url: this.endpoints.CREATE, body: params });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindDiseaseGroupAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindDiseaseGroupAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: FindDiseaseGroupAndDeleteRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }


    async findOneAndDelete({ id }: FindDiseaseGroupAndDeleteRQ): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`) })
        } catch (error) {
            throw error;
        }
    }
}