export interface ApiKey {
    id: number;
    name: string;
}

export interface GETApiKeyResponseDto {
    apiKeys: ApiKey[];
}

export interface POSTApiKeyResponseDto extends ApiKey {
    apikey: string;
}

export interface PATCHApiKeyResponseDto extends ApiKey { }