import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "../config";
import { CredentialAPI } from "../endpoints/endpoint.type";

export class CredentialService extends AbstractService<CredentialAPI> {
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