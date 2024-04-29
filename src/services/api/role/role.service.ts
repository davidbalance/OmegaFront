import { RoleAPI } from "@/services/endpoints";
import { IFindService, ICreateService, IUpdateService, IDeleteService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { CreateRoleRQ, FindRoleAndDeleteRQ, FindRoleAndUpdateRQ, FindRolesRS, Role } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class RoleService
    extends AbstractService<RoleAPI>
    implements IFindService<any, Role>,
    ICreateService<CreateRoleRQ, void>,
    IUpdateService<FindRoleAndUpdateRQ, void>,
    IDeleteService<FindRoleAndDeleteRQ, void> {

    async find(): Promise<Role[]> {
        try {
            const { roles }: FindRolesRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return roles;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): Role | Promise<Role> {
        throw new Error("Method not implemented.");
    }

    async create(params: CreateRoleRQ): Promise<void> {
        try {
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindRoleAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindRoleAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            });
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: FindRoleAndDeleteRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete({ id }: FindRoleAndDeleteRQ): Promise<void> {
        try {
            await OmegaFetch.delete({ url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`), });
        } catch (error) {
            throw error;
        }
    }

}