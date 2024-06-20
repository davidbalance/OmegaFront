export interface ApiKey {
    id: number;
    name: string;
}

export interface GETApiKeyArrayResponseDto {
    apiKeys: ApiKey[];
}

export interface POSTApiKeyResponseDto extends ApiKey {
    apikey: string;
}

export interface PATCHApiKeyResponseDto extends ApiKey { }

export interface DELETEApiKeyResponseDto { }