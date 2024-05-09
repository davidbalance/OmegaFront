import { RoleService } from "@/services/api";
import { Role } from "@/services/api/role/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useLayoutEffect, useState } from "react";

export const useRole = (loadOnStart: boolean = false) => {
    const roleService = new RoleService(endpoints.ROLE.V1);

    const [loading, Disclosure] = useDisclosure();
    const [roles, setRoles] = useState<Role[]>([]);

    useLayoutEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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

    return {
        loading,
        roles,
        find
    }
}