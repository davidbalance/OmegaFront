import { AbstractService } from "./AbstractService";
import { OmegaFetch } from "./config/omegaFetch"
import { removeTokens, setTokens } from "./config/tokenHandler";
import { AuthenticationAPI } from "./endpoints/endpoint.type";

export class AuthenticationService extends AbstractService<AuthenticationAPI>{

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
    }

    async submitLogout(cb?: () => void): Promise<void> {
        await OmegaFetch.post({
            url: this.endpoints.LOGOUT
        });
        removeTokens();
    }
}