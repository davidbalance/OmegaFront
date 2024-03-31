import { ICreateService, IDeleteService, IFindService, IUpdateService, UserAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { CreateUserRQ, FindUserAndDeleteRQ, FindUserAndUpdateRQ, FindUsersRS, User } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class UserService
    extends AbstractService<UserAPI>
    implements IFindService<any, User>,
    ICreateService<CreateUserRQ, void>,
    IUpdateService<FindUserAndUpdateRQ, void>,
    IDeleteService<FindUserAndDeleteRQ, void>{

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

    findOne(params: any): User | Promise<User> {
        throw new Error("Method not implemented.");
    }

    async create(params: CreateUserRQ): Promise<void> {
        try {
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndUpdate(params: FindUserAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindUserAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    findAndDelete(params: FindUserAndDeleteRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndDelete({ id }: FindUserAndDeleteRQ): Promise<void> {
        try {
            await OmegaFetch.delete({
                url: this.endpoints.FIND_ONE_AND_DELETE(`${id}`)
            })
        } catch (error) {
            throw error;
        }
    }

}