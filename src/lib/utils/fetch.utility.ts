import { FetchError } from "../errors/fetch.error";

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type FetcherConfigurationOptions = Omit<RequestInit, 'method'> & { method: HttpMethod };

export const fetchConfiguration = ({ method, body, headers, ...customInit }: FetcherConfigurationOptions): RequestInit => ({
    method: method,
    headers: {
        ...headers
    },
    body,
    ...customInit
});

export const fetcher = async (url: string, { method, body, ...request }: FetcherConfigurationOptions): Promise<any> => {
    const configurationObject: RequestInit = fetchConfiguration({ method, body: body ? JSON.stringify(body) : undefined, ...request });
    console.log(configurationObject);
    const response = await fetch(url, configurationObject);
    const data = await response.json();
    if (!response.ok) {
        throw new FetchError(response, `Failed to ${method}: ${response.url}`, data);
    }
    return data;
}