import { RoleModel } from "@/services";

export type UpdateRolePermissionRequestDTO = {
    permissions: number[]
}

export type CreateRoleRequestDTO = Omit<RoleModel, 'id' | 'permissions'> & UpdateRolePermissionRequestDTO;

export type UpdateRoleRequestDTO = {
    name: string;
}