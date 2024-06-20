import { fetcher, PostFetcherConfigurationOptions, GetFetcherConfigurationOptions, PatchFetcherConfigurationOptions, DeleteFetcherConfigurationOptions, PutFetcherConfigurationOptions } from "./fetcher";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../constants";
import endpoints from "@/lib/endpoints/endpoints";
import dayjs from "dayjs";
import { cookies } from "next/headers"
import { FetchError } from "../errors/fetch.error";

type TokenOptions = {
    authKey: string;
    refreshKey?: string | null;
    expires?: string;
}

export type WithAuthOptions = TokenOptions & {
    refreshURL?: string | null;
    refreshProcessing?: ((response: any) => string) | null;
};

export type WithLoginOptions = TokenOptions;

type TokenProcessingOptions = TokenOptions & { authToken: string, refreshToken?: string | null }
const processToken = ({ authKey, refreshKey, authToken, refreshToken, expires }: TokenProcessingOptions): string => {
    const cookieManager = cookies();
    cookieManager.set(authKey, authToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        expires: dayjs(expires).toDate(),
        path: '/'
    });

    if (refreshKey && refreshToken) {
        cookieManager.set(refreshKey, refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            expires: dayjs(expires).toDate(),
            path: '/'
        });
    }

    return authToken;
}

export const DEFAULT_WITH_AUTH_OPTIONS: WithAuthOptions = {
    authKey: AUTH_TOKEN_COOKIE,
    refreshKey: REFRESH_TOKEN_COOKIE,
    refreshURL: endpoints.AUTHENTICATION.AUTH.REFRESH,
    refreshProcessing: processToken
}

type WithAuthConfigurationOptions<T> = GetFetcherConfigurationOptions | PostFetcherConfigurationOptions<T> | PatchFetcherConfigurationOptions<T> | PutFetcherConfigurationOptions<T> | DeleteFetcherConfigurationOptions<T>;
type WithAuthDelegate<T, R> = (url: string, options: WithAuthConfigurationOptions<T>) => Promise<R>;

export const withAuth = <T, R>(method: WithAuthDelegate<T, R>, { authKey, refreshKey, refreshURL, refreshProcessing }: WithAuthOptions): (WithAuthDelegate<T, R>) => {
    return async (url: string, options: WithAuthConfigurationOptions<T>) => {
        const cookieManager = cookies();
        const tokenAuth: string | null = cookieManager.get(authKey)?.value || null;

        if (!tokenAuth) {
            throw new Error('No authentication token provided');
        }

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${tokenAuth}`
        }

        try {
            return await method(url, options);
        } catch (error: any) {
            if (error instanceof FetchError && error.response.status === 401) {
                if (refreshKey && refreshURL) {
                    const tokenRefresh: string | null = cookieManager.get(refreshKey)?.value || null;
                    if (tokenRefresh) {
                        const headers: Record<string, string> = { 'Authorization': `Bearer ${tokenRefresh}` };
                        const response: any = await fetcher(refreshURL, {
                            method: "POST",
                            headers: headers
                        });
                        if (refreshProcessing) {
                            const authToken = response['access'];
                            const refreshToken = response['refresh'];
                            const expires = response['expiresAt'];
                            refreshProcessing({ authKey, authToken, refreshKey, refreshToken, expires });
                            const retryMethod = withAuth(method, { authKey });
                            return retryMethod(url, { ...options });
                        }
                    }
                }
            }
            throw error;
        }
    }
}

export const DEFAULT_WITH_LOGIN_OPTIONS: WithLoginOptions = {
    authKey: AUTH_TOKEN_COOKIE,
    refreshKey: REFRESH_TOKEN_COOKIE,
}

export type WithLoginConfigurationOptions<T> = PostFetcherConfigurationOptions<T>;
export const withLogin = <T, R>(
    method: (url: string, options: WithLoginConfigurationOptions<T>) => Promise<R>,
    { authKey, refreshKey }: WithLoginOptions
): ((url: string, options: WithLoginConfigurationOptions<T>) => Promise<R>) => {
    return async (url: string, { ...options }: WithLoginConfigurationOptions<T>) => {
        try {
            const result: any = await method(url, options);
            const authToken: string = result['access'];
            processToken({ authKey, authToken, refreshKey, refreshToken: result['refresh'], expires: result['expiresAt'] });
            return result;
        } catch (error) {
            throw error;
        }
    }
}