import 'server-only'
import ApiClientBase from "../base/api-client.base";
import omegaEndpoint from "./endpoints";
import { OmegaMethod } from "./omega-api-config";
import { cookies } from "next/headers";
import ApiClientError from "../base/api-error";
import { tokenOption } from "@/lib/token-option";
import UrlBuilder from '../base/url-builder';

type OmegaToken = { access: string, refresh: string, expires: string };
type EnpointOptions = { customHeader: string[] }
class OmegaClientBase extends ApiClientBase<OmegaMethod> {

    private _token: string | undefined = undefined;

    constructor(
        baseUrl: string,
        private readonly key: string
    ) {
        super(omegaEndpoint.methods, baseUrl);
    }

    public async authenticate(): Promise<OmegaToken> {
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
            return { ...tokens, expires: tokens.expiresAt };
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
        }
    }

    public async refreshToken(token: string): Promise<OmegaToken> {
        const method: string = 'POST';
        const headers = new Headers();
        headers.set('authorization', `Bearer ${token}`);
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

    public async retriveSession(session: string): Promise<{ token: string, refresh: string }> {
        const method: string = 'GET';
        const url = UrlBuilder.builder(`${this._baseUrl}/${omegaEndpoint.session.sessionDetail}`).param({ session }).build();
        const headers = new Headers();
        headers.set('x-client-key', this.key);

        try {
            const request = new Request(url, { method, headers });
            const response = await fetch(request);
            if (!response.ok) {
                throw new ApiClientError(method, response);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async createSession(body: { token: string, refresh: string }): Promise<{ session: string }> {
        const method: string = 'POST';
        const url = UrlBuilder.builder(`${this._baseUrl}/${omegaEndpoint.session.sessionCreate}`).build();
        const headers = new Headers();
        headers.set('x-client-key', this.key);
        headers.set('content-type', 'application/json');

        try {
            const request = new Request(url, { method, headers, body: JSON.stringify(body) });
            const response = await fetch(request);
            if (!response.ok) {
                throw new ApiClientError(method, response);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async updateSession(session: string, body: { token: string, refresh: string }): Promise<void> {
        const method: string = 'PATCH';
        const url = UrlBuilder.builder(`${this._baseUrl}/${omegaEndpoint.session.sessionUpdate}`).param({ session }).build();
        const headers = new Headers();
        headers.set('x-client-key', this.key);
        headers.set('content-type', 'application/json');

        try {
            const request = new Request(url, { method, headers, body: JSON.stringify(body) });
            const response = await fetch(request);
            if (!response.ok) {
                throw new ApiClientError(method, response);
            }
        } catch (error) {
            throw error;
        }
    }

    public async removeSession(session: string): Promise<void> {
        const method: string = 'DELETE';
        const url = UrlBuilder.builder(`${this._baseUrl}/${omegaEndpoint.session.sessionDelete}`).param({ session }).build();
        const headers = new Headers();
        headers.set('x-client-key', this.key);

        try {
            const request = new Request(url, { method, headers });
            const response = await fetch(request);
            if (!response.ok) {
                throw new ApiClientError(method, response);
            }
        } catch (error) {
            throw error;
        }
    }

    public async execute(key: keyof OmegaMethod): Promise<any> {
        if (!this._isServerContext()) throw new Error('Api clients can only work on the server.');

        const endpoint = this.endpoints[key];
        if (!endpoint) throw new Error(`No endpoint found for: ${key.toString()}`);
        if (endpoint.options) {
            const customHeader = (endpoint.options as EnpointOptions).customHeader
            this._addHeaders(customHeader);
        }

        return super.execute(key);
    }

    public addToken(token: string): this {
        this._token = token;
        return this;
    }

    private _addHeaders(options: string[]): void {
        if (options.includes('auth') && !this._token) throw new Error('There is not token set before doing the request');
        const header: Record<string, [string, string]> = {
            'auth': ['authorization', `Bearer ${this._token}`],
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
        const option = tokenOption(expires);
        cookie.set(key, value, option);
    }

    private _removeToken(key: string): void {
        const cookie = cookies();
        cookie.delete(key);
    }
}

export default OmegaClientBase;