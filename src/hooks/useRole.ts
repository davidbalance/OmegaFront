import { RoleService } from "@/services/api";
import { CreateRoleRQ, FindRoleAndDeleteRQ, FindRoleAndUpdateRQ, Role } from "@/services/api/role/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useLayoutEffect, useState } from "react";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const create = async (dto: CreateRoleRQ) => {
        Disclosure.open();
        try {
            const group = await roleService.create(dto);
            Disclosure.close();
            return group;
        } catch (error) {
            notifications.show({
                title: 'Error al crear un rol',
                message: 'Se produjo un error al crear el rol 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const update = async ({ id, ...params }: FindRoleAndUpdateRQ) => {
        Disclosure.open();
        try {
            const group = await roleService.findOneAndUpdate({ id: id, ...params });
            Disclosure.close();
            return group;
        } catch (error) {
            notifications.show({
                title: 'Error al actualizar el rol',
                message: 'Se produjo un error al actualizar el rol 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const remove = async ({ id, ...params }: FindRoleAndDeleteRQ) => {
        Disclosure.open();
        try {
            await roleService.findOneAndDelete({ id, ...params });
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al eliminar el rol',
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
                title: 'Error al obtener roles',
                message: 'Ha ocurrido un error al obtener roles 😔',
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
        role: index !==undefined ? roles[index] : undefined,
        create,
        update,
        remove,
        find,
        selectItem,
        clearSelected
    }
}