import { OmegaFetch } from "../config";
import { RoleAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

type FindRoleResponse = {
    id: number;
    name: string;
    permission: [];
}

export class RoleService extends AbstractService<RoleAPI>{
    async find() {
        try {
            const { roles } = await OmegaFetch.get<{ roles: FindRoleResponse[] }>({ url: this.endpoints.FIND });
            return roles;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}