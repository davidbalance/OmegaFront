export interface FetchHookResult<T> {
    /**
     * Will return the fetched value if not is null
     */
    data: T | null;
    /**
     * Will return the error given by the server
     */
    error: Error | null;
    /**
     * If loading is true then the system is fetching
     */
    loading: boolean;
}