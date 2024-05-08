export type FindAndUpdateRolesRQ = {
    id: number;
    user: number;
    roles: number[];
}

export type FindAndUpdateResourcesRQ = {
    user: number;
    resources: number[];
}

export type FindACClientRQ = {
    user: number
}

export type DeleteRoleRQ = {
    id: number;
}