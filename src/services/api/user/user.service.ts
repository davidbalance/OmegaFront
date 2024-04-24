import { UserAPI } from "@/services/endpoints";
import { IFindService, ICreateService, IUpdateService, IDeleteService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { OmegaFetch } from "@/services/config";
import { User, CreateUserRQ, UpdateUserRQ, DeleteUserRQ, FindUsersRS, CreateUserRS, UpdateUserRS, FindUserRS } from "./dtos";

export class UserService
    extends AbstractService<UserAPI>
    implements IFindService<any, User>,
    ICreateService<CreateUserRQ, User>,
    IUpdateService<UpdateUserRQ, User>,
    IDeleteService<DeleteUserRQ, void> {

    find(): User[] | Promise<User[]>;
    find(params: any): User[] | Promise<User[]>;
    async find(params?: unknown): Promise<User[]> {
        try {
            const { users }: FindUsersRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findOne(params: any): Promise<User> {
        try {
            const user: FindUserRS = await OmegaFetch.get({ url: this.endpoints.FIND_ONE });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async create(params: CreateUserRQ): Promise<User> {
        try {
            const user: CreateUserRS = await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: UpdateUserRQ): User | Promise<User> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: UpdateUserRQ): Promise<User> {
        try {
            const user: UpdateUserRS = await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: DeleteUserRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete({ id }: DeleteUserRQ): Promise<void> {
        try {
            await OmegaFetch.delete({
                url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`)
            })
        } catch (error) {
            throw error;
        }
    }

}