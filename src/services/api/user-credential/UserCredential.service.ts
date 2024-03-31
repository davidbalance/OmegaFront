import { CredentialAPI, ICreateService, IUpdateService } from "@/services";
import { AbstractService } from "../abstract.service";
import { CreateCredentialRQ, FindCredentialAndUpdateRQ } from ".";
import { OmegaFetch } from "@/services/config";

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