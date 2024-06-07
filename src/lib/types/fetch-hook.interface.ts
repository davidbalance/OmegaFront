export interface FetchHookResult<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}