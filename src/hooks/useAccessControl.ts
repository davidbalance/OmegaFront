import { AccessControlService } from "@/services/api";
import { FindAndUpdateRolesRQ } from "@/services/api/access-control/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const useAccessControl = () => {

    const [loading, Disclosure] = useDisclosure();

    const accessControlService = new AccessControlService(endpoints.ACCESS_CONTROL.V1);

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
        updateRoles
    }
}