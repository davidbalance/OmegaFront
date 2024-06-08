import { FetchHookResult } from "@/lib/types/fetch-hook.interface";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type FetchResult<T> = FetchHookResult<T> & {
    status: number | null;
    request: <R>(body: R) => void;
    reload: () => void;
}

type FetchOptions<T> = Omit<RequestInit, ' body' | 'method'> & {
    loadOnMount?: boolean
}

const useFetch = <T>(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", options?: FetchOptions<T>): FetchResult<T> => {
    const { loadOnMount = true, ...other } = options || {};

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
            const json = await response.json();
            setStatus(response.status);
            if (!response.ok) {
                setError(new Error(json.message || 'Algo salió mal!'));
            } else {
                setData(json);
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

    return { data, error, loading, status, request, reload };
}

export { useFetch };