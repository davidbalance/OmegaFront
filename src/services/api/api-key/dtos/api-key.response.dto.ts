export type ApiKey = {
    id?: number;
    name: string;
}

export type FindApiKeyRS = ApiKey;
export type FindApiKeysRS = {
    apiKeys: ApiKey[];
}

export type CreateApiKeyRS = {
    apikey: string;
}

export type UpdateApiKeyRS = {}
