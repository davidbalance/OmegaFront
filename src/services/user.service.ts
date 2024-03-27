import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "./config";
import { UserAPI } from "./endpoints/endpoint.type";

type CreateUserRequest = { email: string; dni: string; name: string; lastname: string; }
type UpdateUserRequest = { email: string; name: string; lastname: string; }
type UpdateDNIRequest = { dni: string; }

type FindUsersResponse = { id: number; dni: string; name: string; lastname: string; email: string }

export class UserService extends AbstractService<UserAPI> {

    async create() { }

    async find(): Promise<FindUsersResponse[]> {
        try {
            const response = await OmegaFetch.get<{ amount: number, users: FindUsersResponse[] }>({ url: this.endpoints.FIND });
            const { users } = response;
            const tableHeaders = ['CI', 'Correo Electronico', 'Nombre', 'Apellido'];
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findOne() { }

    async findOneAndUpdate() { }

    async findOneAndInactive() { }

    public findOneAndDelete() { }

}