export type FindAndUpdateACRolesRQ = {
    user: number;
    roles: number[];
}

export type FindAndUpdateACResourcesRQ = {
    user: number;
    resources: number[];
}

export type FindACClientRQ = {
    user: number
}

export type DeleteACRoleRQ = {
    id: number;
}