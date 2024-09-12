export type ApiResource = {
    resource: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    options?: any;
}