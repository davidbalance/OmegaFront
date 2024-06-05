import { FetcherConfigurationOptions, HttpMethod, fetcher, withAuth } from "@/lib/utils/fetch.utility";
import { AuthenticationAPI } from "@/services/endpoints";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToken } from "./useToken";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import dayjs from "dayjs";

type CacheType = {
    [key: string]: any;
}

const cache: CacheType = {}

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    refresh: () => void;
    requestData: (body?: any) => void;
}

export interface FetchOptions {
    auth?: { refresh: string };
    method?: HttpMethod;
    cacheExpirationSeconds?: number
    fetchOnMount?: boolean;
}


const useFetch = <T>(url: string, options: FetchOptions): FetchResult<T> => {
    const { auth = undefined, cacheExpirationSeconds = 60, fetchOnMount = true, method = 'GET' } = options;
    const cacheKey = url;
    const cacheRef = useRef(cache);

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
    const [initialFetchDone, setInitialFetchDone] = useState<boolean>(false);

    const [requestBody, setRequestBody] = useState<any>(null);

    const [authToken, AuthenticationToken] = useToken(AUTH_TOKEN_COOKIE);
    const [refreshingToken, RefreshingToken] = useToken(REFRESH_TOKEN_COOKIE);

    const decideFetcher = useCallback(() => {
        if (auth) {
            if (!authToken || !refreshingToken) return;
            return withAuth(fetcher, {
                token:
                {
                    auth: authToken,
                    refresh: refreshingToken
                },
                refreshing: {
                    url: auth.refresh,
                    process: ({ access, refresh }) => {
                        AuthenticationToken.save({ value: access.token, expiresAt: dayjs(access.expiresAt).toDate() });
                        RefreshingToken.save({ value: refresh.token, expiresAt: dayjs(access.expiresAt).toDate() });
                    }
                }
            })
        } else {
            return fetcher;
        }
    }, [url, auth, authToken, refreshingToken]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        if (cacheRef.current[cacheKey]) {
            const { data, timestamp } = cacheRef.current[cacheKey];
            const expirationSeconds: number = cacheExpirationSeconds;
            const currentTime = new Date().getTime() / 1000;

            if (currentTime < timestamp + expirationSeconds) {
                setData(data);
                setIsLoading(false);
                setInitialFetchDone(true);
                return;
            } else {
                delete cacheRef.current[cacheKey];
            }
        }

        const requestOptions: FetcherConfigurationOptions = {
            method: method,
            body: requestBody
        };

        try {
            const localFetcher = decideFetcher();
            if (!localFetcher) {
                console.error('Token not loaded');
                return;
            }
            const data = await localFetcher(url, requestOptions);
            setData(data);
            cacheRef.current[cacheKey] = { data, timestamp: new Date().getTime() / 1000 }
            setIsLoading(false);
            setInitialFetchDone(true);
        } catch (error) {
            setError(error);
            setIsLoading(false);
            setInitialFetchDone(true);
        }

    }, [method, url, requestBody, cacheExpirationSeconds, decideFetcher]);

    useEffect(() => {
        if (fetchOnMount || initialFetchDone) {
            fetchData();
        }
        return () => { }
    }, [shouldRefresh, initialFetchDone, fetchData]);

    const refresh = () => {
        setShouldRefresh(prev => !prev);
    }

    const requestData = (body?: any) => {
        setRequestBody(body);
    }

    return { data, error, isLoading, refresh, requestData };
}

export { useFetch }


/* import { useCallback, useEffect, useState } from "react"
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

export { useFetch } */