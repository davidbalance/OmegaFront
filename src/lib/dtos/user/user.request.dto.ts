interface UserRequestDto {
    name: string;
    lastname: string;
    email: string;
}

export interface POSTUserRequestDto extends UserRequestDto {
    dni: string
}

export interface PATCHUserRequestDto extends Partial<UserRequestDto> { }

export interface PATCHUserAttributeRequestDto {
    value: string;
}