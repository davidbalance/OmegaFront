import { getBearer, getBearerRefresh, setTokens } from "@/lib";
import endpoints from "../endpoints/endpoints";
import { Stream } from "stream";

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
    method: <T, R>(request: RestClientRequest<T>) => Promise<R>,
    refresh: boolean = true
): (<T, R>(request: RestClientRequest<T>) => Promise<R>) =>
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
                        url: endpoints.AUTHENTICATION.V1.REFRESH,
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
    body,
    ...customInit
})

async function get<T, R>({ url, body, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("GET", {
        body: body ? JSON.stringify(body) : undefined,
        ...customInit
    });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to get ${response.url}`, data);
    }

    return data;
}

async function post<T, R>({ url, body, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("POST", {
        body: body ? JSON.stringify(body) : undefined,
        ...customInit
    });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to post ${response.url}`, data);
    }

    return data;
}

async function put<T, R>({ url, body, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("PUT", {
        body: body ? JSON.stringify(body) : undefined,
        ...customInit
    });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to put ${response.url}`, data);
    }

    return data;
}

async function patch<T, R>({ url, body, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("PATCH", {
        body: body ? JSON.stringify(body) : undefined,
        ...customInit
    });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to patch ${response.url}`, data);
    }
    return data;
}

async function del<T, R>({ url, body, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("DELETE", {
        body: body ? JSON.stringify(body) : undefined,
        ...customInit
    });
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to delete ${response.url}`, data);
    }

    return data;
}

async function getfile<T, R>({ url, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("GET", { ...customInit });
    const response = await fetch(url, initConfigObject);
    if (!response.ok) {
        throw new RestError(response, `Failed to get file ${response.url}`, 'File error');
    }

    return response.blob() as R;
}

async function postfile<T, R>({ url, ...customInit }: RestClientRequest<T>): Promise<R> {
    const initConfigObject: RequestInit = initConfig("POST", {
        ...customInit,
        headers: {
            ...customInit.headers
        }
    });
    const headers: any = initConfigObject.headers;
    delete headers['Content-Type'];
    initConfigObject.headers = headers;
    const response = await fetch(url, initConfigObject);
    const data = await response.json();
    if (!response.ok) {
        throw new RestError(response, `Failed to post file ${response.url}`, data);
    }

    return data;
}

export class OmegaFetch {
    static async get<T, R>(init: RestClientRequest<T>): Promise<R> {
        const getAuthMethod = withAuth(get);
        return getAuthMethod(init);
    }

    static async post<T, R>(init: RestClientRequest<T>): Promise<R> {
        const postAuthMethod = withAuth(post);
        return postAuthMethod(init);
    }

    static async put<T, R>(init: RestClientRequest<T>): Promise<R> {
        const putAuthMethod = withAuth(put);
        return putAuthMethod(init);
    }

    static async patch<T, R>(init: RestClientRequest<T>): Promise<R> {
        const patchAuthMethod = withAuth(patch);
        return patchAuthMethod(init);
    }

    static async delete<T, R>(init: RestClientRequest<T>): Promise<R> {
        const deleteAuthMethod = withAuth(del);
        return deleteAuthMethod(init);
    }

    static async sendFile<T, R>(init: RestClientRequest<T>): Promise<R> {
        const fileAuthMethod = withAuth(postfile);
        return fileAuthMethod(init);
    }

    static async getFile<T, R extends Blob>(init: RestClientRequest<T>): Promise<R> {
        const fileAuthMethod = withAuth(getfile);
        return fileAuthMethod(init);
    }
}