import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "../config";
import { UserAPI } from "../endpoints/endpoint.type";
import { FindUsersResponse, ICrudService, UserModel } from "..";

export class UserService
    extends AbstractService<UserAPI>
    implements ICrudService<UserModel, number> {

    async find(): Promise<UserModel[]> {
        try {
            const response = await OmegaFetch.get<{ users: FindUsersResponse[] }>({ url: this.endpoints.FIND });
            const { users } = response;
            return users;
        } catch (error) {
            throw error;
        }
    }

    findOne(key: number): UserModel | Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    findOneAndDelete(key: number): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    findOneAndUpdate(key: number, value: UserModel): UserModel | Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
}