import { FindMorbidityResponse, ICrudService } from "..";
import { OmegaFetch } from "../config";
import { CreateMorbidityRequestDTO, UpdateMorbidityRequestDTO } from "../dtos/morbidity/morbidity.request.dto";
import { MorbidityAPI } from "../endpoints/endpoint.type";
import { MorbidityModel } from "../models/morbidity.model";
import { AbstractService } from "./abstract.service";

export class MorbidityService
    extends AbstractService<MorbidityAPI>
    implements ICrudService<MorbidityModel, number> {

    async create(value: any): Promise<MorbidityModel> {
        try {
            const body: CreateMorbidityRequestDTO = { ...value };
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: body
            });
            return value;
        } catch (error) {
            throw error;
        }
    }

    async find(): Promise<MorbidityModel[]> {
        try {
            const response = await OmegaFetch.get<{ morbidities: FindMorbidityResponse[] }>({
                url: this.endpoints.FIND
            });
            const { morbidities } = response;
            return morbidities;
        } catch (error) {
            throw error;
        }
    }

    async findOne(key: number): Promise<MorbidityModel> {
        try {
            const response = await OmegaFetch.get<{ morbidity: FindMorbidityResponse }>({
                url: this.endpoints.FIND_ONE(key)
            });
            const { morbidity } = response;
            return morbidity;
        } catch (error) {
            throw error;
        }
    }

    async findOneAndDelete(key: number): Promise<void> {
        try {
            await OmegaFetch.delete({
                url: this.endpoints.FIND_ONE_AND_INACTIVE(key)
            });
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(key: number, value: Partial<MorbidityModel>): Promise<void> {
        try {
            const body: UpdateMorbidityRequestDTO = { ...value, group: value.group as number, };
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(key),
                body: body
            })
        } catch (error) {
            throw error;
        }
    }

}