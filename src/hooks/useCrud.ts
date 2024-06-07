import { useCallback } from "react";
import { FetchOptions } from "./useFetch/useFetch.interfaces";
import { useFetch } from "./useFetch/useFetch";

export type CrudOptions<T> = Omit<FetchOptions<T>, 'method'>;

type PostHookOptions<T> = CrudOptions<T>
const usePost = <T>(url: string, options?: PostHookOptions<T>) => {
    const { fetchOnMount = false, cacheResponse = false, ...other } = options ?? {}
    const { data, error, isLoading, refresh, requestData, clean } = useFetch<T>(url, { method: 'POST', fetchOnMount, ...other });

    const send = (body: any) => {
        requestData(body);
        refresh();
    };

    return { data, error, isLoading, send, clean }
}

type GetHookOptions<T> = Omit<CrudOptions<T>, 'requestBody'>
const useGet = <T>(url: string, options?: GetHookOptions<T>) => {
    const { requestData, ...result } = useFetch<T>(url, { ...options, method: 'GET' });
    return result;
}

type PatchHookOptions<T> = CrudOptions<T>
const usePatch = <T>(url: string, options?: PatchHookOptions<T>) => {
    const { fetchOnMount = false, cacheResponse = false, ...other } = options ?? {}
    const { data, error, isLoading, refresh, requestData, clean } = useFetch<T>(url, { method: 'PATCH', fetchOnMount, ...other });

    const send = useCallback(async (body: any) => {
        requestData(body);
        refresh();
    }, [requestData, refresh]);

    return { data, error, isLoading, send, clean }
}

type DeleteHookOptions<T> = Omit<CrudOptions<T>, 'requestBody'>
const useDelete = <T>(url: string, options?: DeleteHookOptions<T>) => {
    const { fetchOnMount = false, cacheResponse = false, ...other } = options ?? {}
    return useFetch<T>(url, { method: 'DELETE', fetchOnMount, ...other });
}

const useCrud = <T>(url: string, options?: CrudOptions<T>) => {
    const create = usePost(url, options);
    const read = useGet(url, options);
    const update = usePatch(url, options);
    const remove = useDelete(url, options);

    return { create, read, update, remove };
}

export { usePost, useGet, usePatch, useDelete, useCrud };