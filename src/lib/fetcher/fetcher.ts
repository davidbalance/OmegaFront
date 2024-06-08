'use server'

import NodeCache from 'node-cache';
import { FetchError } from '../errors/fetch.error';

export type FetcherHTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface FetcherConfigurationOptions<T> extends Omit<RequestInit, 'method' | 'body'> {
    method: FetcherHTTPMethod;
    body?: T,
    type?: 'json' | 'blob',
    cached?: boolean;
    cachedExpirationSeconds?: number;
};

const fetchConfiguration = ({ method, body, headers, ...customInit }: Omit<FetcherConfigurationOptions<string | undefined>, 'type' | 'cached' | 'cachedExpirationSeconds'>): RequestInit => ({
    method: method,
    headers: {
        ...headers
    },
    body,
    ...customInit
});

const cache = new NodeCache();

export const fetcher = async <T, R>(url: string, { method, body, cached = true, cachedExpirationSeconds = 60, type = 'json', headers, ...request }: FetcherConfigurationOptions<T>): Promise<R> => {
    const cacheKey = `${method}:${url}:${JSON.stringify(body)}`;
    const cacheData = cache.get<R>(cacheKey);

    if (cacheData) {
        return cacheData;
    }

    const configurationObject: RequestInit = fetchConfiguration({
        headers: { 'Content-Type': 'application/json', ...headers },
        method,
        body: body ? JSON.stringify(body) : undefined,
        ...request
    });

    try {
        const response = await fetch(url, configurationObject);
        if (!response.ok) {
            const errorData = await response.json();
            throw new FetchError(response, `Failed to ${method}: ${response.url}`, errorData);
        }

        const data = await response[type]();

        if (cached) {
            cache.set(cacheKey, data, cachedExpirationSeconds);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export interface GetFetcherConfigurationOptions extends Omit<FetcherConfigurationOptions<any>, 'method' | 'body'> { }
export const get = <R>(url: string, options?: GetFetcherConfigurationOptions): Promise<R> => {
    return fetcher<any, R>(url, { method: 'GET', ...options });
}

export interface PostFetcherConfigurationOptions<T> extends Omit<FetcherConfigurationOptions<T>, 'method'> { }
export const post = <T, R>(url: string, options?: PostFetcherConfigurationOptions<T>): Promise<R> => {
    return fetcher<T, R>(url, { method: 'POST', cached: false, ...options });
}

export interface PatchFetcherConfigurationOptions<T> extends Omit<FetcherConfigurationOptions<T>, 'method'> { }
export const patch = <T, R>(url: string, options?: PatchFetcherConfigurationOptions<T>): Promise<R> => {
    return fetcher<T, R>(url, { method: 'PATCH', cached: false, ...options });
}

export interface PutFetcherConfigurationOptions<T> extends Omit<FetcherConfigurationOptions<T>, 'method'> { }
export const put = <T, R>(url: string, options?: PutFetcherConfigurationOptions<T>): Promise<R> => {
    return fetcher<T, R>(url, { method: 'PUT', cached: false, ...options });
}

export interface DeleteFetcherConfigurationOptions<T> extends Omit<FetcherConfigurationOptions<T>, 'method' | 'body'> { }
export const del = <T, R>(url: string, options?: DeleteFetcherConfigurationOptions<T>): Promise<R> => {
    return fetcher<T, R>(url, { method: 'DELETE', cached: false, ...options });
}