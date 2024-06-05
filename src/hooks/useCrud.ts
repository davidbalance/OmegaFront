import { useCallback } from "react";
import { FetchOptions, useFetch } from "./useFetch"

export type CrudOptions = Omit<FetchOptions, 'method'>;

const usePost = <T>(url: string, options?: CrudOptions) => {
    const { data, error, isLoading, refresh, requestData } = useFetch<T>(url, { method: 'POST', ...options });

    const send = useCallback(async (body: any) => {
        requestData(body);
        refresh();
    }, [requestData, refresh]);

    return { data, error, isLoading, send }
}

const useGet = <T>(url: string, options?: CrudOptions) => {
    const { requestData, ...result } = useFetch<T>(url, { ...options });
    return result;
}

const usePatch = <T>(url: string, options?: CrudOptions) => {
    const { data, error, isLoading, refresh, requestData } = useFetch<T>(url, { method: 'PATCH', ...options });

    const send = useCallback(async (body: any) => {
        requestData(body);
        refresh();
    }, [requestData, refresh]);

    return { data, error, isLoading, send }
}

const useDelete = <T>(url: string, options?: CrudOptions) => {
    return useFetch<T>(url, { method: 'DELETE', ...options });
}

const useCrud = <T>(url: string, options?: CrudOptions) => {
    const create = usePost(url, options);
    const read = useGet(url, options);
    const update = usePatch(url, options);
    const remove = useDelete(url, options);

    return { create, read, update, remove };
}

export { usePost, useGet, usePatch, useDelete, useCrud };