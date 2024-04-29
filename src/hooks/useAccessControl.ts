import { AccessControlService } from "@/services/api";
import { ACClient, FindAndUpdateRolesRQ } from "@/services/api/access-control/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useAccessControl = () => {

    const accessControlService = new AccessControlService(endpoints.ACCESS_CONTROL.V1);

    const [loading, Disclosure] = useDisclosure();

    const [client, setClient] = useState<ACClient | undefined>(undefined);

    const findOne = async (id: number) => {
        Disclosure.open();
        try {
            const foundClient = await accessControlService.findOne({ user: id });
            setClient(foundClient);
            Disclosure.close();
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

    const updateRoles = async (accessControl: FindAndUpdateRolesRQ) => {
        Disclosure.open();
        try {
            await accessControlService.findOneAndUpdateRoles(accessControl);
            Disclosure.close();
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
        client,
        findOne,
        updateRoles
    }
}