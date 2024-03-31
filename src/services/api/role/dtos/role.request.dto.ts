export type CreateRoleRQ = {
    name: string;
    resources: number[]
}

export type FindRoleAndUpdateRQ = Partial<CreateRoleRQ> & {
    id: number
}

export type FindRoleAndDeleteRQ = {
    id: number;
}