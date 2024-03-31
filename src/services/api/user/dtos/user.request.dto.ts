export type CreateUserRQ = {
    dni: string;
    name: string;
    lastname: string;
    email: string;
}

export type FindUserAndUpdateRQ = Partial<Omit<CreateUserRQ, 'dni'>> & {
    id: number;
}

export type FindUserAndDeleteRQ = {
    id: number;
}