export type CreateUserRequest = {
    email: string;
    dni: string;
    name: string;
    lastname: string;
}

export type UpdateUserRequest = {
    email: string;
    name: string;
    lastname: string;
}

export type UpdateDNIRequest = {
    dni: string;
}
