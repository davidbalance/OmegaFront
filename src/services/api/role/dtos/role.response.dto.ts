import { ClaimEnum } from "@/lib";

export type Role = {
    id: number;
    name: string;
    resources: {
        id: number;
        name: string;
        claim: ClaimEnum
    }
}

export type FindRolesRS = {
    roles: Role[]
}