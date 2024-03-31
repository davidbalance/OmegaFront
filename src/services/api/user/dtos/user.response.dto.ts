export type User = {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export type FindUsersRS = {
    users: User[];
}