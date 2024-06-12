import { FetchHookResult } from "@/lib/types/fetch-hook.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

type FetchResult<T> = FetchHookResult<T> & {
    /**
     * Will give you the http status of the request
     */
    status: number | null;
    /**
     * Set the body for the request body
     * @template R Type of the request body
     * @param body Request body
     */
    request: <R>(body: R | null) => void;
    /**
     * Triggers the request
     */
    reload: () => void;
    /**
     * Resets the data, error and request body;
     */
    reset: () => void;
}

type FetchOptions<T> = Omit<RequestInit, ' body' | 'method'> & {
    /**
     * Will indicates the system to fetch when the component is mounted
     */
    loadOnMount?: boolean;
    /**
     * Decides if you are getting a json or blob
     */
    type?: 'json' | 'blob'
}

const useFetch = <T>(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", options?: FetchOptions<T>): FetchResult<T> => {
    const { loadOnMount = true, type = 'json', ...other } = options || {};

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);
    const [body, setBody] = useState<any | null>(null);

    const requestOptions = useMemo((): RequestInit => ({
        method,
        body: body ? JSON.stringify(body) : undefined,
        ...other,
        headers: {
            'Content-Type': 'application/json',
            ...other.headers
        }
    }), [method, other]);

    const handleFetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        setStatus(null);
        try {
            const response = await fetch(url, requestOptions);
            setStatus(response.status);
            if (!response.ok) {
                const json = await response.json();
                setError(new Error(json.message || 'Algo salió mal!'));
            } else {
                const retrived = await response[type]();
                setData(retrived);
            }
        } catch (error: any) {
            console.error('Fetch error:', error);
            setStatus(500);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url, requestOptions]);

    useEffect(() => {
        if (loadOnMount) {
            handleFetch();
        }
    }, [loadOnMount]);

    const request = <R>(body: R | null) => {
        setBody(body);
    }

    const reload = useCallback(() => {
        handleFetch();
    }, [handleFetch]);

    const reset = useCallback(() => {
        setData(null);
        setBody(null);
        setError(null);
    }, []);

    return { data, error, loading, status, request, reload, reset };
}

export { useFetch };