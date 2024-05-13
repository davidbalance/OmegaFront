export type FindApiKeyRQ = {}

export type CreateApiKeyRQ = {
    name: string;
}

export type UpdateApiKeyRQ = {
    id: number;
    name: string;
}

export type DeleteApiKeyRQ = {
    id: number;
}