export type CreateCredentialRQ = {
    email: string;
    password: string;
    user: string;
}

export type FindCredentialAndUpdateRQ = {
    email: string;
    password: string;
}