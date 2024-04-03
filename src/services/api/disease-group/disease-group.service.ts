import { CreateDiseaseGroupRQ, CreateDiseaseGroupRS, DeleteDiseaseGroupRQ, DeleteDiseaseRQ, DiseaseGroup, DiseaseGroupAPI, FindDiseaseGroupsRS, FindSelectorOptionsDisease, ICreateService, IDeleteService, IFindService, ISelectorService, IUpdateService, UpdateDiseaseGroupRQ, UpdateDiseaseGroupRS } from "@/services";
import { AbstractService } from "../abstract.service";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";

export class DiseaseGroupService
    extends AbstractService<DiseaseGroupAPI>
    implements IFindService<any, DiseaseGroup>,
    ISelectorService<any, number>,
    ICreateService<CreateDiseaseGroupRQ, DiseaseGroup>,
    IUpdateService<UpdateDiseaseGroupRQ, DiseaseGroup>,
    IDeleteService<DeleteDiseaseGroupRQ, void> {

    async find(): Promise<DiseaseGroup[]> {
        try {
            const { groups }: FindDiseaseGroupsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return groups;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): DiseaseGroup | Promise<DiseaseGroup> {
        throw new Error("Method not implemented.");
    }

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindSelectorOptionsDisease = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }

    async create(params: CreateDiseaseGroupRQ): Promise<DiseaseGroup> {
        try {
            const disease: CreateDiseaseGroupRS = await OmegaFetch.post({ url: this.endpoints.CREATE, body: params });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: UpdateDiseaseGroupRQ): DiseaseGroup | Promise<DiseaseGroup> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: UpdateDiseaseGroupRQ): Promise<DiseaseGroup> {
        try {
            const disease: UpdateDiseaseGroupRS = await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: DeleteDiseaseRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }


    async findOneAndDelete({ id }: DeleteDiseaseRQ): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`) });
        } catch (error) {
            throw error;
        }
    }
}