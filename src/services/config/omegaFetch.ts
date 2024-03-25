import endpoints from "../endpoints/endpoints";
import { getBearer, getBearerRefresh, setTokens } from "./tokenHandler";

export type RestClientRequest<T> = Omit<RequestInit, 'body'> & { url: string, body?: T }

export class RestError<T> extends Error {
    constructor(
        readonly response: Response,
        readonly message: string,
        readonly data: T) {
        super(message);
    }
}

const withAuth = (
    method: <T>(request: RestClientRequest<T>) => Promise<T>,
    refresh: boolean = true
): (<T>(request: RestClientRequest<T>) => Promise<T>) =>
    async (request) => {
        const bearer = await getBearer();
        if (bearer) {
            request.headers = {
                ...request.headers,
                Authorization: bearer
            }
        }
        try {
            return await method(request);
        } catch (error) {
            if (error instanceof RestError) {
                const token = await getBearerRefresh();
                if (error.response.status === 401 && refresh && token) {
                    const refresh: any = await post({
                        url: endpoints.AUTH.V1.REFRESH,
                        headers: {
                            Authorization: token
                        }
                    });
                    setTokens(refresh);
                    const retryMethod = withAuth(method, false)
                    return retryMethod(request);
                }
            }
            throw error;
        }
    }

type RestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
const initConfig = (
    method: RestMethod, { body, headers, ...customInit }: Omit<RestClientRequest<any>, 'url'>
): RequestInit => ({
    method: method,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    ...customInit
}
)

async function get<T>({ url, ...customInit }: RestClientRequest<T>): Promise<T> {
    const initConfigObject: RequestInit = initConfig("GET", { ...customInit });

    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to get ${response.url}`, data);
    }

    return data;
}

async function post<T>({ url, ...customInit }: RestClientRequest<T>): Promise<T> {
    const initConfigObject: RequestInit = initConfig("POST", { ...customInit });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to post ${response.url}`, data);
    }

    return data;
}

async function put<T>({ url, ...customInit }: RestClientRequest<T>): Promise<T> {
    const initConfigObject: RequestInit = initConfig("PUT", { ...customInit });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to put ${response.url}`, data);
    }

    return data;
}

async function patch<T>({ url, ...customInit }: RestClientRequest<T>): Promise<T> {
    const initConfigObject: RequestInit = initConfig("PATCH", { ...customInit });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to patch ${response.url}`, data);
    }

    return data;
}

async function del<T>({ url, ...customInit }: RestClientRequest<T>): Promise<T> {
    const initConfigObject: RequestInit = initConfig("PUT", { ...customInit });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to delete ${response.url}`, data);
    }

    return data;
}

export class OmegaFetch {
    static async get<T>(init: RestClientRequest<T>): Promise<T> {
        const getAuthMethod = withAuth(get);
        return getAuthMethod(init);
    }

    static async post<T>(init: RestClientRequest<T>): Promise<T> {
        const postAuthMethod = withAuth(post);
        return postAuthMethod(init);
    }

    static async put<T>(init: RestClientRequest<T>): Promise<T> {
        const putAuthMethod = withAuth(put);
        return putAuthMethod(init);
    }

    static async patch<T>(init: RestClientRequest<T>): Promise<T> {
        const patchAuthMethod = withAuth(patch);
        return patchAuthMethod(init);
    }

    static async delete<T>(init: RestClientRequest<T>): Promise<T> {
        const deleteAuthMethod = withAuth(del);
        return deleteAuthMethod(init);
    }
}