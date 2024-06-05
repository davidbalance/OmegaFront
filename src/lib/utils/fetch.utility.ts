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

type WithAuthOptions = {
    token: {
        auth: string;
        refresh: string;
    },
    refreshing: {
        url: string,
        process: (response: any) => void;
    }
}

export const withAuth = (
    method: (url: string, options: FetcherConfigurationOptions) => Promise<any>,
    { token, refreshing }: WithAuthOptions
): ((url: string, options: FetcherConfigurationOptions) => Promise<any>) => (
    async (url: string, { ...options }: FetcherConfigurationOptions) => {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token.auth}`
        }
        try {
            return await method(url, options);
        } catch (error: any) {
            if (error instanceof FetchError && error.response.status === 401) {
                const headers: Record<string, string> = { 'Authorization': `Bearer ${token.refresh}` }
                const response: any = await fetcher(refreshing.url, {
                    method: "POST",
                    headers: headers
                });
                refreshing.process(response);
                const retryMethod = withAuth(method, { token, refreshing });
                return retryMethod(url, options);
            }
            throw error;
        }
    }
);