import { getBearer, getBearerRefresh, setTokens } from "@/lib";
import endpoints from "../endpoints/endpoints";

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


export { get, post, put, patch, del, withAuth }