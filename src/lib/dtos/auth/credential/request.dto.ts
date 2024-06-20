export interface POSTCredentialRequestDto {
    email: string;
    password: string;
    user: number;
}

export interface PATCHCredentialRequestDto {
    email: string;
    password: string;
}