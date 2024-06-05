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
    }, [auth, authToken, refreshingToken]);

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