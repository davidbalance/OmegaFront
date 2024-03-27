import { PermissionModel } from ".";

export type RoleModel = {
    id: number;
    name: string;
    permissions?: PermissionModel[]
}