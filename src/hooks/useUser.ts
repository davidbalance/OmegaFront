import { OmegaWebClientService, UserService } from "@/services/api";
import { FindAndUpdateACRolesRQ } from "@/services/api/access-control/dtos";
import { CreateCredentialRQ } from "@/services/api/user-credential/dtos";
import { CreateUserRQ, DeleteUserRQ, UpdateUserRQ, User } from "@/services/api/user/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useLayoutEffect, useState } from "react";
import { useCredential } from "./useCredential";
import { useAccessControl } from "./useAccessControl";

export const useUser = (loadOnStart: boolean = false) => {

    const [loading, Disclosure] = useDisclosure();
    const [users, setUsers] = useState<User[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    const userCredential = useCredential();
    const accessControl = useAccessControl();
    const omegaClientService = new OmegaWebClientService(endpoints.OMEGA_WEB_CLIENT.V1);

    const userService = new UserService(endpoints.USER.V1);

    useLayoutEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const create = async ({ dni, email, lastname, name, password, roles, logo }: CreateUserRQ & Omit<CreateCredentialRQ, 'user'> & Omit<FindAndUpdateACRolesRQ, 'user'> & { logo: number }) => {
        Disclosure.open();
        try {
            const createdUser = await userService.create({ dni, email, lastname, name });
            const { id } = createdUser;
            await userCredential.create({ email, password, user: id! });
            await accessControl.updateRoles({ roles, user: id! });
            await omegaClientService.assignLogo({ user: id!, logo });
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
            const foundUsers = await userService.find();
            setUsers(foundUsers);
            Disclosure.close();
            return foundUsers;
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

    const selectItem = (index: number) => setIndex(index);
    const clearSelection = () => setIndex(undefined);

    return {
        loading,
        user: index !== undefined ? users[index] : undefined,
        users,
        create,
        find,
        update,
        remove,
        selectItem,
        clearSelection
    }
};