import { ApiKeyAPI } from "@/services/endpoints";
import { ICreateService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { CreateApiKeyRQ } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class ApiKeyService
    extends AbstractService<ApiKeyAPI>
    implements ICreateService<CreateApiKeyRQ, void> {

    async create(params: CreateApiKeyRQ): Promise<any> {
        try {
            const apiKeyData = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            })
            return apiKeyData
        } catch (error) {
            throw error;
        }
    }


}