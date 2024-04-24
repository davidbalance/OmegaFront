export type User = {
    id?: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export type FindUserRS = User;

export type FindUsersRS = {
    users: User[];
}

export type CreateUserRS = User;
export type UpdateUserRS = User;