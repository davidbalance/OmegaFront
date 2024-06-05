import { useCallback, useEffect, useState } from "react"
import { useToken } from "./useToken";
import { AuthenticationAPI } from "@/services/endpoints";
import dayjs from "dayjs";
import { FetchError } from "@/lib/errors/fetch.error";
import { FetcherConfigurationOptions, HttpMethod, fetcher } from "@/lib/utils/fetch.utility";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

export interface FetchOptions {
    auth?: AuthenticationAPI;
    method?: HttpMethod;
    cacheKey?: string;
    cacheExpirationSeconds?: number
    fetchOnMount?: boolean;
}

export interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    refresh: () => void;
    requestData: (body?: any) => void;
    urlParams: (values: string) => void;
}

type FetchURL = string | ((urls: string) => string);

const useFetch = <T>(url: FetchURL, options: FetchOptions): FetchResult<T> => {

    const { auth = undefined, method = 'GET', cacheKey = undefined, cacheExpirationSeconds = 120, fetchOnMount = true } = options;

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [requestBody, setRequestBody] = useState<any>(null);
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
    const [initialFetchDone, setInitialFetchDone] = useState<boolean>(false);
    const [refreshToken, RefreshTokenMethod] = useToken(REFRESH_TOKEN_COOKIE);
    const [authToken, AuthTokenMethod] = useToken(AUTH_TOKEN_COOKIE);
    const [params, setParams] = useState<string | undefined>(undefined);

    useEffect(() => {
        let timeout = undefined;
        if (fetchOnMount && !initialFetchDone) {
            timeout = setTimeout(() => fetchData(), 250);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [shouldRefresh, url, initialFetchDone, authToken]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        const suffixTimestamp = '_timestamp';

        if (cacheKey) {
            const cachedData = localStorage.getItem(cacheKey);
            const timestampKey: string = `${cacheKey}${suffixTimestamp}`;
            const cachedTimestamp = localStorage.getItem(timestampKey);

            if (cachedData && cachedTimestamp) {
                const expirationSeconds: number = cacheExpirationSeconds ?? 900;
                const currentTime = new Date().getTime() * 1000;
                const expirationTime = parseInt(cachedTimestamp, 10) + expirationSeconds;

                if (currentTime < expirationTime) {
                    setData(JSON.parse(cachedData));
                    setIsLoading(false);
                    setInitialFetchDone(true);
                    return;
                } else {
                    localStorage.removeItem(cacheKey);
                    localStorage.removeItem(timestampKey);
                }
            }
        }

        const requestOptions: FetcherConfigurationOptions = {
            method: method,
            body: requestBody
        }

        try {
            let json;
            const transformedUrl: string = processURL();
            if (auth) {
                json = await withAuth(fetcher)(transformedUrl, requestOptions);
            } else {
                json = await fetcher(transformedUrl, requestOptions);
            }
            setData(json);
            if (cacheKey) {
                localStorage.setItem(cacheKey, JSON.stringify(json));
                localStorage.setItem(`${cacheKey}${suffixTimestamp}`, new Date().getTime().toString());
            }
        } catch (error: any) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
            setInitialFetchDone(true);
        }
    }

    const processURL = useCallback((): string => {
        if (typeof url === 'string') {
            return url;
        }
        if (params === undefined) {
            throw new Error('the current URL requires params');
        }
        return url(params);
    }, [params]);

    const withAuth = (
        method: (url: string, options: FetcherConfigurationOptions) => Promise<any>
    ): ((url: string, options: FetcherConfigurationOptions) => Promise<any>) => (
        async (url: string, { ...options }: FetcherConfigurationOptions) => {
            if (!authToken) throw new Error('Token not found');
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${authToken}`
            }
            try {
                return await method(url, options);
            } catch (error: any) {
                if (error instanceof FetchError && error.response.status === 401 && auth && refreshToken) {
                    const headers: Record<string, string> = { 'Authorization': `Bearer ${refreshToken}` }
                    const { access, refresh }: any = await fetcher(auth.REFRESH, {
                        method: "POST",
                        headers: headers
                    });
                    AuthTokenMethod.save({ value: access.token, expiresAt: dayjs(access.expiresAt).toDate() });
                    RefreshTokenMethod.save({ value: refresh.token, expiresAt: dayjs(refresh.expiresAt).toDate() });
                    const retryMethod = withAuth(method);
                    return retryMethod(url, options);
                }
                setError(error);
            }
        }
    );

    const refresh = () => {
        setShouldRefresh(prev => !prev);
    }

    const requestData = (body?: any) => {
        setRequestBody(body);
    }

    const urlParams = (values: string) => {
        setParams(values);
    }

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        refresh,
        requestData,
        urlParams
    }

}

export { useFetch }