export type ApiResource = {
    resource: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
}

export type ApiMethod = {
    [key: string]: ApiResource;
}