import { FindMorbidityGroupResponseDTO, ICrudService } from "..";
import { OmegaFetch } from "../config";
import { MorbidityGroupAPI } from "../endpoints/endpoint.type";
import { MorbidityGroupModel } from "../models/morbidity-group.model";
import { AbstractService } from "./abstract.service";

export class MorbidityGroupService
    extends AbstractService<MorbidityGroupAPI>
    implements ICrudService<MorbidityGroupModel, number> {

    async create(value: any): Promise<MorbidityGroupModel> {
        try {
            await OmegaFetch.post({ url: this.endpoints.CREATE, body: value });
            return value;
        } catch (error) {
            throw error;
        }
    }

    async find(): Promise<MorbidityGroupModel[]> {
        try {
            const response = await OmegaFetch.get<{ groups: FindMorbidityGroupResponseDTO[] }>({
                url: this.endpoints.FIND
            });
            const { groups } = response;
            return groups;
        } catch (error) {
            throw error;
        }
    }

    findOne(key: number): MorbidityGroupModel | Promise<MorbidityGroupModel> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete(key: number): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_INACTIVE(key) })
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(key: number, value: MorbidityGroupModel): Promise<void> {
        try {
            await OmegaFetch.patch({ url: this.endpoints.FIND_ONE_AND_UPDATE(key), body: value });
        } catch (error) {
            throw error;
        }
    }
}