import 'server-only'
import apiClient, { RequestBody } from '../_base/api-client.base';
import omegaEndpoint from './endpoints';
import { ApiClientState } from '../_base/api-client.base';
import { QueryParams, URLParams } from '../_base/url-builder';
import backendConfig from '@/config/backend.config';

type OmegaMethod = typeof omegaEndpoint;
type OmegaState = ApiClientState;

const defaultState: OmegaState = {
    body: undefined,
    flags: [],
    headers: {},
    params: {},
    query: {}
}

const baseApiClient = (baseUrl: string) => apiClient<OmegaMethod>(baseUrl)(omegaEndpoint);
const omegaClient = (baseUrl: string) =>
    (state: OmegaState = defaultState) => {
        const updateState = (newState: Partial<OmegaState>) => omegaClient(baseUrl)({ ...state, ...newState });

        const addToken = (token: string) => {
            const headers = state.headers as Record<string, string>;
            const newHeaders = {
                ...state.headers,
                authorization: headers['authorization']
                    ? `${headers['authorization']}, Bearer ${token}`
                    : `Bearer ${token}`
            }
            return updateState({ headers: newHeaders });
        }

        const execute = (key: keyof OmegaMethod) => {
            let newState: OmegaState = { ...state };
            if (!(state.body instanceof FormData)) {
                newState = {
                    ...state, headers: {
                        'content-type': 'application/json',
                        ...state.headers
                    }
                }
            }
            return baseApiClient(baseUrl)(newState)
                .addHeaders({ ...newState.headers })
                .execute(key);
        }

        return {
            addToken,
            addParams: (params: URLParams) => updateState({ params: { ...state.params, ...params } }),
            addQuery: (query: QueryParams) => updateState({ query: { ...state.query, ...query } }),
            addHeaders: (headers: HeadersInit) => updateState({ headers: { ...state.headers, ...headers } }),
            addFlags: (flags: string[]) => updateState({ flags: Array.from(new Set([...state.flags, ...flags])) }),
            addBody: (body: RequestBody) => updateState({ body }),
            execute
        }
    }

const trigger = (baseUrl: string) => omegaClient(baseUrl)();
const omega = () => trigger(backendConfig.uri);
export default omega;