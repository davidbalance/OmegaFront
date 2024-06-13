export interface ApiKey {
    id: number;
    name: string;
}

export interface GETApiKeyResponseDto {
    apiKeys: ApiKey[];
}

export interface POSTApiKeyResponseDto {
    apiKey: string;
}

export interface PATCHApiKeyResponseDto extends ApiKey { }