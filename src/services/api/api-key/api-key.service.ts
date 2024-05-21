import { ApiKeyAPI } from "@/services/endpoints/types/api-key-api.type";
import { AbstractService } from "../abstract.service";
import { ICreateService, IDeleteService, IFindService, IUpdateService } from "@/services/interfaces";
import { ApiKey, CreateApiKeyRQ, CreateApiKeyRS, DeleteApiKeyRQ, FindApiKeysRS, UpdateApiKeyRQ } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class ApiKeyService
    extends AbstractService<ApiKeyAPI>
    implements IFindService<any, ApiKey>,
    ICreateService<CreateApiKeyRQ, string>,
    IUpdateService<UpdateApiKeyRQ, void>,
    IDeleteService<DeleteApiKeyRQ, void> {

    find(): ApiKey[] | Promise<ApiKey[]>;
    find(params: any): ApiKey[] | Promise<ApiKey[]>;
    async find(params?: unknown): Promise<ApiKey[]> {
        try {
            const data: FindApiKeysRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return data.apiKeys;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): ApiKey | Promise<ApiKey> {
        throw new Error("Method not implemented.");
    }

    async create({ ...params }: CreateApiKeyRQ): Promise<string> {
        try {
            const { apikey }: CreateApiKeyRS = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            });
            return apikey;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: UpdateApiKeyRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: UpdateApiKeyRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            });
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: DeleteApiKeyRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete({ id }: DeleteApiKeyRQ): Promise<void> {
        try {
            await OmegaFetch.delete({
                url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`)
            });
        } catch (error) {
            throw error;
        }
    }
}