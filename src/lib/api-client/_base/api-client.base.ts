import { ApiResource } from './api-client.types';
import urlBuilder, { QueryParams, URLParams } from './url-builder';

type ParseBody = { body: Record<string, any> | FormData | undefined, method: string, endpoint: string, flag?: string };
export type RequestBody = Record<string, any> | FormData | undefined;

const parseBody = ({ body, method, endpoint, flag = '' }: ParseBody): (string | FormData | null) => {
    if (
        !body &&
        !flag.includes('--no-body') &&
        (method === 'POST' || method === 'PATCH' || method === 'PUT')
    ) throw new Error(`(${endpoint}) ${method.toUpperCase()} request must have a body, if not add --no-body flag`);
    return !body
        ? null
        : (body instanceof FormData ? body : JSON.stringify(body));
}

const buildUrl = (url: string) =>
    (params: URLParams) =>
        (query: QueryParams) =>
            urlBuilder(url)
                .param(params)
                .query(query)
                .build();

const executeRequest = async (url: string, options: RequestInit): Promise<any> => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${response.status} - ${error.message}`);
    }

    const contentType = response.headers.get('content-type');
    return contentType?.includes('application/json')
        ? response.json()
        : contentType?.includes('text')
            ? response.text()
            : response.blob();
};

export type ApiClientState = {
    params: URLParams,
    query: QueryParams,
    headers: HeadersInit,
    flags: string[],
    body: RequestBody | undefined,
}
const defaultApiClientState: ApiClientState = {
    params: {},
    query: {},
    headers: {},
    flags: [],
    body: undefined
}
const apiClient = <T extends { [key: string]: ApiResource }>(baseUrl: string) =>
    (endpoints: T) =>
        (state: ApiClientState = defaultApiClientState) => {

            const updateState = (newState: Partial<ApiClientState>) => apiClient<T>(baseUrl)(endpoints)({ ...state, ...newState });

            const execute = async (key: keyof T) => {
                const api = endpoints[key];
                if (!api) throw new Error(`No endpoint found for: ${key.toString()}`);

                const url = buildUrl(`${baseUrl}/${api.resource}`)(state.params)(state.query);
                const method = api.method.toUpperCase();
                const endpoint = api.resource;
                const body = parseBody({ body: state.body, method, endpoint, flag: state.flags.join(' ') });
                return executeRequest(url, { method, headers: state.headers, body, next: { tags: [key.toString()] } });
            };

            return {
                addParams: (params: URLParams) => updateState({ params: { ...state.params, ...params } }),
                addQuery: (query: QueryParams) => updateState({ query: { ...state.query, ...query } }),
                addHeaders: (headers: HeadersInit) => updateState({ headers: { ...state.headers, ...headers } }),
                addFlags: (flags: string[]) => updateState({ flags: Array.from(new Set(...state.flags, ...flags)) }),
                addBody: (body: RequestBody) => updateState({ body }),
                execute,
            };
        }

const trigger = <T extends { [key: string]: ApiResource }>(baseUrl: string) =>
    (endpoints: T) => apiClient<T>(baseUrl)(endpoints);

export default trigger;