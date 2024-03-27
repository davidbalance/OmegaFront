import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "../config";
import { CredentialAPI } from "../endpoints/endpoint.type";
import { CredentialModel, ICrudService, IFindOneAndUpdateService } from "..";

export class CredentialService
    extends AbstractService<CredentialAPI>
    implements IFindOneAndUpdateService<CredentialModel, number> {

    async findOneAndUpdate(key: number, value: Partial<CredentialModel>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async updatePassword(credential: {
        email: string,
        password: string
    }) {
        return OmegaFetch.patch({
            url: this.endpoints.PASSWORD,
            body: credential
        })
    }
}