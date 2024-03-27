import { ICrudService, RoleModel } from "..";
import { OmegaFetch } from "../config";
import { FindRolesResponseDTO } from "../dtos/role";
import { RoleAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class RoleService
    extends AbstractService<RoleAPI>
    implements ICrudService<RoleModel, number>{

    async find(): Promise<RoleModel[]> {
        try {
            const { roles } = await OmegaFetch.get<{ roles: FindRolesResponseDTO[] }>({ url: this.endpoints.FIND });
            return roles;
        } catch (error) {
            throw error;
        }
    }

    findOne(key: number): RoleModel | Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete(key: number): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_UPDATE(key) });
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(key: number, value: RoleModel): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_INACTIVE(key),
                body: value
            });
        } catch (error) {
            throw error;
        }
    }

}