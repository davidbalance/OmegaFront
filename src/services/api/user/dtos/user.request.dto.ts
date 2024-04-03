export type CreateUserRQ = {
    dni: string;
    name: string;
    lastname: string;
    email: string;
}

export type UpdateUserRQ = Partial<Omit<CreateUserRQ, 'dni'>> & {
    id: number;
}

export type DeleteUserRQ = {
    id: number;
}