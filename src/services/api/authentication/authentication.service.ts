import { AuthenticationAPI } from "@/lib/endpoints";
import { AbstractService } from "../abstract.service";
import { AuthenticationLoginRQ, AuthenticationLoginRS } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class AuthenticationService
    extends AbstractService<AuthenticationAPI> {

    async login(params: AuthenticationLoginRQ): Promise<AuthenticationLoginRS> {
        try {
            const values: AuthenticationLoginRS = await OmegaFetch.post({
                url: this.endpoints.LOGIN,
                body: params
            });
            return values;
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await OmegaFetch.post({
                url: this.endpoints.LOGOUT
            })
        } catch (error) {
            throw error;
        }
    }
}