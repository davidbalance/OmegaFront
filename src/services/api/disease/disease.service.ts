import {
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
    DeleteDiseaseRQ,
    FindDiseasesRS,
    FindSelectorOptionsDisease,
    UpdateDiseaseRQ,
    UpdateDiseaseRS
} from "./dtos";
import { OmegaFetch } from "@/services/config";
import { SelectorOption } from "@/lib";

export class DiseaseService
    extends AbstractService<DiseaseAPI>
    implements IFindService<any, Disease>,
    ICreateService<CreateDiseaseRQ, Disease>,
    IUpdateService<UpdateDiseaseRQ, Disease>,
    IDeleteService<DeleteDiseaseRQ, void>,
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
            const { options }: FindSelectorOptionsDisease = await OmegaFetch.get({ url: this.endpoints.FIND_SELECTOR });
            return options;
        } catch (error) {
            throw error;
        }
    }

    async create(params: CreateDiseaseRQ): Promise<Disease> {
        try {
            const disease: CreateDiseaseRS = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            });
            return disease;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: UpdateDiseaseRQ): Disease | Promise<Disease> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: UpdateDiseaseRQ): Promise<Disease> {
        try {
            const disease: UpdateDiseaseRS = await OmegaFetch.patch({
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
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`), });
        } catch (error) {
            throw error;
        }
    }
}