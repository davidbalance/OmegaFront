import { AbstractService } from "./AbstractService";
import { UserAPI } from "./endpoints/endpoint.type";

type CreateUserRequest = { email: string; dni: string; name: string; lastname: string; }
type UpdateUserRequest = { email: string; name: string; lastname: string; }
type UpdateDNIRequest = { dni: string; }

export class UserService extends AbstractService<UserAPI> {
    async create() { }

    async find() { }

    async findOne() { }

    async findOneAndUpdate() { }

    async findOneAndInactive() { }

}