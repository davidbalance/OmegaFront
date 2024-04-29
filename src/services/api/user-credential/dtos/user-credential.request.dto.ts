export type CreateCredentialRQ = {
    email: string;
    password: string;
    user: number;
}

export type FindCredentialAndUpdateRQ = {
    email: string;
    password: string;
}