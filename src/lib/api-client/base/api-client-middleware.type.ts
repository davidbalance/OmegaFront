export type ApiClientRequest = {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: Record<string, any> | FormData | undefined;
}


export type ApiClientMiddleware = (
    request: ApiClientRequest,
    next: () => Promise<any>
) => Promise<any>;