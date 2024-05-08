import { RoleService } from "@/services/api";
import { DeleteRoleRQ, FindAndUpdateRolesRQ } from "@/services/api/access-control/dtos";
import { CreateRoleRQ, Role } from "@/services/api/role/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useEffect, useLayoutEffect, useState } from "react";

export const useRole = (loadOnStart: boolean = false) => {
    const roleService = new RoleService(endpoints.ROLE.V1);

    const [loading, Disclosure] = useDisclosure();
    const [roles, setRoles] = useState<Role[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, [])

    const create = async (dto: CreateRoleRQ) => {
        Disclosure.open();
        try {
            const group = await roleService.create(dto);
            Disclosure.close();
            return group;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al crear el rol 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const update = async ({ id, ...params }: FindAndUpdateRolesRQ) => {
        Disclosure.open();
        try {
            const group = await roleService.findOneAndUpdate({ id, ...params });
            Disclosure.close();
            return group;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al actualizar el rol 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const remove = async ({ id, ...params }: DeleteRoleRQ) => {
        Disclosure.open();
        try {
            await roleService.findOneAndDelete({ id, ...params });
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al eliminar el rol 😔',
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
            const roles = await roleService.find();
            setRoles(roles);
            Disclosure.close();
            return roles;
        } catch (error) {
            notifications.show({
                title: 'Error al crear un usuario',
                message: 'Ha ocurrido un error al asignar los roles al usuario 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }


    const selectItem = (index: number) => setIndex(index);
    const clearSelected = () => setIndex(undefined);

    return {
        loading,
        roles,
        roleUser: index !==undefined ? roles[index] : undefined,
        create,
        update,
        remove,
        find,
        selectItem,
        clearSelected
    }
}