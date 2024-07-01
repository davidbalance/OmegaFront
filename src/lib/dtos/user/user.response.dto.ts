export interface User {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export interface GETUserResponseDto extends User { }

export interface GETUserArrayResponseDto {
    users: User[];
}

export interface POSTUserResponseDto extends User { }

export interface PATCHUserResponseDto extends User { }

export interface GETUserAttributeResponseDto {
    id: number;
    name: string;
    value: string;
}

export interface PATCHUserExtraAttributeResponseDto { }