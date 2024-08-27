import ApiClientBase from "../base/api-client.base";
import omegaEndpoint from "./endpoints";
import { OmegaMethod } from "./omega-api-config";
import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import ApiClientError from "../base/api-error";
import dayjs from "dayjs";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

type OmegaToken = { access: string, refresh: string, expires: string };
type EnpointOptions = { customHeader: string[] }
class OmegaClientBase extends ApiClientBase<OmegaMethod> {

    constructor(
        baseUrl: string
    ) {
        super(omegaEndpoint.methods, baseUrl);
    }

    public async authenticate(): Promise<void> {
        try {
            const endpoint = omegaEndpoint.authentication.sessionWithLogin;
            const url = `${this._baseUrl}/${endpoint}`;
            const method = 'POST';

            if (!this._body) throw new Error('Credentials are required');
            const body = JSON.stringify(this._body);

            const headers = new Headers();
            headers.set('content-type', 'application/json');

            const request = new Request(url, { method, body, headers });
            const response = await fetch(request);

            if (!response.ok) throw new ApiClientError(method, response);

            const tokens = await response.json();
            const { access, refresh, expiresAt } = tokens;
            this._setToken(AUTH_TOKEN_COOKIE, access, expiresAt);
            this._setToken(REFRESH_TOKEN_COOKIE, refresh, expiresAt);
        } catch (error) {
            if (error instanceof ApiClientError) {
                if (error.status === 403) error.updateMessage('Bad credentials');
                throw error;
            }
            throw error;
        }
    }

    public async revokeAuthentication(): Promise<void> {
        try {
            const method = 'POST';
            const url = `${this._baseUrl}/${omegaEndpoint.authentication.sessionWithLogin}`;

            const request = new Request(url, { method });
            const response = await fetch(request);

            if (!request) throw new ApiClientError(method, response);
        } catch (error) {
            throw error;
        } finally {
            this._removeToken(AUTH_TOKEN_COOKIE);
            this._removeToken(REFRESH_TOKEN_COOKIE);
        }
    }

    public async execute(key: keyof OmegaMethod): Promise<any> {
        if (!this._isServerContext()) throw new Error('Api clients can only work on the server.');

        let access: string = this._getToken(AUTH_TOKEN_COOKIE);
        if (!this._isTokenValid(access)) {
            const refresh = this._getToken(REFRESH_TOKEN_COOKIE);
            const newToken = await this._refreshToken(refresh);

            this._setToken(AUTH_TOKEN_COOKIE, newToken.access, newToken.expires);
            this._setToken(REFRESH_TOKEN_COOKIE, newToken.refresh, newToken.expires);
            access = newToken.access;
        }

        const endpoint = this.endpoints[key];
        if (!endpoint) throw new Error(`No endpoint found for: ${key.toString()}`);
        if (endpoint.options) {
            const customHeader = (endpoint.options as EnpointOptions).customHeader
            this._addHeaders(customHeader);
        }

        return super.execute(key);
    }

    protected _isTokenValid(token: string): boolean {
        const tokens = token.split('.');
        if (tokens.length <= 1) throw new Error('Is not a valid token');
        const payload = JSON.parse(atob(tokens[1]));
        return payload.exp > Date.now() / 1000;
    }

    private _refreshToken = async (token: string): Promise<OmegaToken> => {
        const method: string = 'POST';
        const headers = new Headers();
        headers.set('authorization', `Bearer ${token}`);
        console.log(headers);
        try {
            const url = `${this._baseUrl}/${omegaEndpoint.authentication.sessionRefresh}`;
            const request = new Request(url, { method, headers });

            const response = await fetch(request);

            if (!response.ok) {
                if (response.status === 403) throw new ApiClientError(method, response, 'Forbidden access');
                throw new Error(`(${response.status}) 'Unable to get token`);
            }
            const data = await response.json();
            const expires = data['expiresAt'];
            return { ...data, expires };
        } catch (error) {
            throw error;
        }
    }

    private _cookieValue(expires: string): Partial<ResponseCookie> {
        return {
            httpOnly: true,
            expires: dayjs(expires).toDate(),
            path: '/'
        }
    }

    private _addHeaders(options: string[]): void {
        const token = this._getToken(AUTH_TOKEN_COOKIE) || '';
        const header: Record<string, [string, string]> = {
            'auth': ['authorization', `Bearer ${token}`],
            'as-json': ['content-type', 'application/json'],
        }

        for (const option of options) {
            if (header[option]) {
                const [key, value] = header[option];
                this.addHeader({ [key]: value });
            }
        }
    }

    private _getToken(key: string): string {
        const cookie = cookies();
        return cookie.get(key)?.value || '';
    }

    private _setToken(key: string, value: string, expires: string): void {
        const cookie = cookies();
        const option = this._cookieValue(expires);
        cookie.set(key, value, option);
    }

    private _removeToken(key: string): void {
        const cookie = cookies();
        cookie.delete(key);
    }
}

export default OmegaClientBase;