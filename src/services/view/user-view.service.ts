import endpoints from "../endpoints/endpoints";
import { IConfigurationService, ICrudService } from "../interfaces";
import { FindUsersResponse, RoleService, UserModel, UserService } from "..";

type UserViewData = UserModel;

export type UserViewConfiguration = {
    users: UserViewData[],
    roles: any[]
}

export class UserViewService
    implements
    IConfigurationService<UserViewConfiguration>,
    ICrudService<UserViewData, number> {
    create(value: any): UserModel | Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    findOneAndUpdate(key: number, value: Partial<UserModel>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    private readonly roleService: RoleService = new RoleService(endpoints.ROLE.V1);
    private readonly userService: ICrudService<UserModel, number> = new UserService(endpoints.USER.V1);

    async initialConfiguration(): Promise<UserViewConfiguration> {
        const users: UserViewData[] = await this.userService.find();
        const roles = await this.roleService.find();
        return { users: users, roles: roles };
    }

    async reloadConfiguration(): Promise<UserViewConfiguration> {
        return await this.initialConfiguration();
    };

    async find(): Promise<UserViewData[]> {
        return await this.userService.find();
    }

    findOne(key: number): UserViewData | Promise<UserViewData> {
        throw new Error("Method not implemented.");
    }

    findOneAndDelete(key: number): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    findOneAndUpdateRoles(key: number, roles: any[]): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}