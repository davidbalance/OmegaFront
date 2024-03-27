import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "../config";
import { UserAPI } from "../endpoints/endpoint.type";
import { CreateUserRequestDTO, FindOneAndUpdateRequestDTO, FindUsersResponse, ICrudService, UserModel } from "..";

export class UserService
    extends AbstractService<UserAPI>
    implements ICrudService<UserModel, number> {

    async create(value: any): Promise<UserModel> {
        try {
            const body: CreateUserRequestDTO = { ...value };
            const reponse: any = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: body
            });
            const { user } = reponse;
            return user as any;
        } catch (error) {
            throw error;
        }
    }

    async find(): Promise<UserModel[]> {
        try {
            const response = await OmegaFetch.get<{ users: FindUsersResponse[] }>({ url: this.endpoints.FIND });
            const { users } = response;
            return users;
        } catch (error) {
            throw error;
        }
    }

    findOne(key: number): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete(key: number): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_INACTIVE(key)
            });
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(key: number, value: Partial<UserModel>): Promise<void> {
        try {
            const body: FindOneAndUpdateRequestDTO = { ...value };
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(key),
                body: body
            })
        } catch (error) {
            throw error;
        }
    }
}