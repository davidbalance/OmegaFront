import { CredentialAPI } from "@/services/endpoints";
import { AbstractService } from "../abstract.service";
import { OmegaFetch } from "@/services/config";
import { ICreateService, IUpdateService } from "@/services/interfaces";
import { CreateCredentialRQ, FindCredentialAndUpdateRQ } from "./dtos";

export class UserCrendentialService
    extends AbstractService<CredentialAPI>
    implements ICreateService<CreateCredentialRQ, void>,
    IUpdateService<FindCredentialAndUpdateRQ, void> {

    async create(params: CreateCredentialRQ): Promise<void> {
        try {
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindCredentialAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate(params: FindCredentialAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_PASSWORD,
                body: params
            })
        } catch (error) {
            throw error;
        }
    }
}