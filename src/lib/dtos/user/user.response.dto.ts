export interface User {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export interface GETUsersResponseDto {
    users: User[];
}

export interface GETUserResponseDto extends User { }

export interface POSTUserResponseDto extends User { }

export interface PATCHUserResponseDto extends User { }