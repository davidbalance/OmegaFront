export interface POSTUserRequestDto {
    dni: string;
    name: string;
    lastname: string;
    email: string;
}

export interface PATCHUserRequestDto extends POSTUserRequestDto { }

export interface PATCHUserAttributeRequestDto {
    value: string;
}