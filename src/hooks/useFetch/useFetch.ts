import { FetchHookResult } from "@/lib/types/fetch-hook.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

type FetchResult<T> = FetchHookResult<T> & {
    /**
     * Will give you the http status of the request
     */
    status: number | null;
    /**
     * Will give you the body request object
     */
    body: any | null;
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
    type?: 'json' | 'blob',
    /**
     * Will indicates the system to fetch when the component is mounted
     */
    application?: 'json' | 'form',
}

const useFetch = <T>(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", options?: FetchOptions<T>): FetchResult<T> => {
    const { loadOnMount = true,
        type = 'json',
        application = 'json',
        ...other } = options || {};

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);
    const [body, setBody] = useState<any | null>(null);

    const requestOptions = useMemo((): RequestInit => ({
        method,
        body: body
            ? (application === 'json'
                ? JSON.stringify(body)
                : body)
            : undefined,
        ...other,
        headers: {
            // 'Content-Type': 'application/json',
            ...other.headers
        }
    }), [method, body, application, other]);

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
                const contentType = response.headers.get('Content-Type') || '';
                let retrived;
                if (contentType.includes('application/json')) {
                    retrived = await response.json();
                } else if (contentType.includes('text')) {
                    retrived = await response.text();
                } else {
                    retrived = await response.blob();
                }
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

    const request = useCallback(<R>(body: R | null) => {
        setBody(body);
    }, []);

    const reload = useCallback(() => {
        handleFetch();
    }, [handleFetch]);

    const reset = useCallback(() => {
        setData(null);
        setBody(null);
        setError(null);
    }, []);

    return { data, error, loading, status, body, request, reload, reset };
}

export { useFetch };