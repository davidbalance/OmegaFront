type RoleResource = {
    id: number;
    name: string;
    claim: string;
}

export type Role = {
    id: number;
    name: string;
    resources: RoleResource[];
}

export type FindRolesRS = {
    roles: Role[]
}