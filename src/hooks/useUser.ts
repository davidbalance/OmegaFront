import { UserService } from "@/services/api";
import { CreateUserRQ, DeleteUserRQ, FindUserRQ, UpdateUserRQ } from "@/services/api/user/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useUser = () => {
    const userService = new UserService(endpoints.USER.V1);

    const create = async (userDTO: CreateUserRQ) => {
        try {
            const user = await userService.create(userDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const find = async (dni: FindUserRQ) => {
        try {
            const user = await userService.find(dni);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const erase = async (dni: DeleteUserRQ) => {
        try {
            const user = await userService.findOneAndDelete(dni);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const update = async (userDTO: UpdateUserRQ) => {
        try {
            const user = await userService.findOneAndUpdate(userDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        create,
        find,
        erase,
        update
        
    }
};