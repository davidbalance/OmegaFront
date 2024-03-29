import { IConfigurationService, PermissionModel, PermissionService, RoleModel, RoleService } from "..";
import endpoints from "../endpoints/endpoints";

type RoleViewConfiguration = {
    roles: RoleModel[];
    permissions: PermissionModel[];
}
export class RoleViewService implements IConfigurationService<RoleViewConfiguration> {
    private readonly roleService = new RoleService(endpoints.ROLE.V1);
    private readonly permissionService = new PermissionService(endpoints.PERMISSION.V1);

    async initialConfiguration(): Promise<RoleViewConfiguration> {
        try {
            const roles = await this.roleService.find();
            const permissions = await this.permissionService.find();
            return { roles, permissions }
        } catch (error) {
            throw error;
        }
    }

    reloadConfiguration(): RoleViewConfiguration | Promise<RoleViewConfiguration> {
        return this.initialConfiguration();
    }
}