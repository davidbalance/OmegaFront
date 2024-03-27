import { AbtractViewService } from ".";
import { RoleService } from "..";
import endpoints from "../endpoints/endpoints";
import { UserService } from "../user.service";

export class UserViewService implements AbtractViewService {

    private readonly userService: UserService = new UserService(endpoints.USER.V1);
    private readonly roleService: RoleService = new RoleService(endpoints.ROLE.V1);

    async initialConfiguration() {
        try {
            const users = await this.userService.find();
            const roles = await this.roleService.find();
            return { users: users, roles: roles };
        } catch (error) {
            throw error;
        }
    }

    async findUsers() {
        try {
            const users = await this.userService.find();
            return users;
        } catch (error) {

        }
    }
}