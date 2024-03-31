import { AuthenticationAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { AuthenticationLoginRQ, AuthenticationLoginRS } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { setTokens } from "@/lib";

export class AuthenticationService
    extends AbstractService<AuthenticationAPI> {

    async login(params: AuthenticationLoginRQ): Promise<void> {
        try {
            const values: AuthenticationLoginRS = await OmegaFetch.post({
                url: this.endpoints.LOGIN,
                body: params
            });
            setTokens(values);
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