import { useCallback, useEffect, useMemo, useState } from "react";
import { FetchOptions, FetchResult } from "./hook.types";

const useFetch = <T>(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", options?: FetchOptions<T>): FetchResult<T> => {
    const {
        body: optionBody = null,
        loadOnMount = true,
        type = 'json',
        application = 'json',
        ...other
    } = options || {};

    const [loadOnMountState, setLoadOnMountState] = useState(loadOnMount)
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);
    const [body, setBody] = useState<any | null>(optionBody);

    const requestOptions = useMemo((): RequestInit => ({
        method,
        body: body
            ? (application === 'json'
                ? JSON.stringify(body)
                : body)
            : undefined,
        ...other,
        headers: {
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
        if (loadOnMountState) {
            handleFetch();
            setLoadOnMountState(false);
        }
    }, [loadOnMountState, handleFetch]);

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