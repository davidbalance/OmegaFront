import { FetchHookResult } from "@/lib/types/fetch-hook.interface";

export type FetchResult<T> = FetchHookResult<T> & {
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

export type FetchOptions<T> = Omit<RequestInit, ' body' | 'method'> & {
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