import { UserService } from "@/services/api";
import { FindAndUpdateRolesRQ } from "@/services/api/access-control/dtos";
import { CreateCredentialRQ } from "@/services/api/user-credential/dtos";
import { CreateUserRQ, DeleteUserRQ, UpdateUserRQ, User } from "@/services/api/user/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useCredential } from "./useCredential";
import { useAccessControl } from "./useAccessControl";

interface UseUserHook {
    loading: boolean;
    users: User[];
    create: (dto: CreateUserRQ & Omit<CreateCredentialRQ, 'user'> & Omit<FindAndUpdateRolesRQ, 'user'>) => User | Promise<User>;
    find: () => User[] | Promise<User[]>;
    update: (dto: UpdateUserRQ) => User | Promise<User>;
    remove: (dto: DeleteUserRQ) => void;

}

export const useUser = (loadOnStart: boolean = false): UseUserHook => {

    const [loading, Disclosure] = useDisclosure();
    const [users, setUsers] = useState<User[]>([]);

    const userCredential = useCredential();
    const accessControl = useAccessControl();

    const userService = new UserService(endpoints.USER.V1);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, []);


    const create = async ({ dni, email, lastname, name, password, roles }: CreateUserRQ & Omit<CreateCredentialRQ, 'user'> & Omit<FindAndUpdateRolesRQ, 'user'>) => {
        Disclosure.open();
        try {
            const createdUser = await userService.create({ dni, email, lastname, name });
            const { id } = createdUser;
            await userCredential.create({ email, password, user: id! });
            await accessControl.updateRoles({ roles, user: id! });
            setUsers([...users, createdUser]);
            Disclosure.close();
            return createdUser;
        } catch (error) {
            notifications.show({
                title: 'Error al crear un usuario',
                message: 'Ha ocurrido un error al crear el usuario 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const find = async () => {
        Disclosure.open();
        try {
            const user = await userService.find();
            setUsers(user);
            Disclosure.close();
            return user;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al obtener los usuarios del servidor 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const update = async ({ id, ...params }: UpdateUserRQ) => {
        Disclosure.open();
        try {
            const user = await userService.findOneAndUpdate({ id, ...params });
            const index = users.findIndex((u) => u.id === id);
            const newUsers = users;
            user.id = id;
            newUsers[index] = user;
            setUsers(newUsers);
            Disclosure.close();
            return user;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al actualizar el usuario 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const remove = async ({ id, ...params }: DeleteUserRQ) => {
        Disclosure.open();
        try {
            await userService.findOneAndDelete({ id, ...params });
            const newUsers = users.filter(e => e.id !== id);
            setUsers(newUsers);
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al eliminar un usuario 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    return {
        loading,
        users,
        create,
        find,
        update,
        remove,
    }
};