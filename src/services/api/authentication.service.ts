import { setTokens, removeTokens } from "@/lib";
import { WebAppConfigurationService } from "..";
import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "../config/omegaFetch"
import { AuthenticationAPI } from "../endpoints/endpoint.type";
import endpoints from "../endpoints/endpoints";

export class AuthenticationService
    extends AbstractService<AuthenticationAPI>{
        
    private appConfiguration: WebAppConfigurationService = new WebAppConfigurationService(endpoints.CONFIGURATION.V1);

    constructor(private _: AuthenticationAPI) {
        super(_);
    }

    async submitLogin({ keepmeLogged = false, ...credentials }: {
        username: string,
        password: string,
        keepmeLogged?: boolean
    }): Promise<void> {
        const response: any = await OmegaFetch.post({
            url: this.endpoints.LOGIN,
            body: credentials
        });
        setTokens(response);
        await this.appConfiguration.initializeConfiguration();
    }

    async submitLogout(): Promise<void> {
        await OmegaFetch.post({
            url: this.endpoints.LOGOUT
        });
        removeTokens();
        this.appConfiguration.cleanupConfiguration();
    }
}