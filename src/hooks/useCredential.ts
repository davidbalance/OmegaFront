import { UserCrendentialService } from "@/services/api";
import { CreateCredentialRQ, FindCredentialAndUpdateRQ } from "@/services/api/user-credential/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const useCredential = () => {

    const [loading, Disclosure] = useDisclosure();

    const credentialService = new UserCrendentialService(endpoints.CREDENTIAL.V1);

    const create = async (credential: CreateCredentialRQ) => {
        Disclosure.open();
        try {
            const newCredential = await credentialService.create(credential);
            Disclosure.close();
            return newCredential;
        } catch (error) {
            notifications.show({
                title: 'Error al crear un usuario',
                message: 'Ha ocurrido un error al asignar las credenciales al usuario 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const update = async ({ ...params }: FindCredentialAndUpdateRQ) => {
        Disclosure.open();
        try {
            await credentialService.findOneAndUpdate({ ...params });
            notifications.show({
                title: 'Exito',
                message: 'Contraseña actualizada con exito 😀',
                color: 'green'
            });
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al actualizar la contraseña 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    return {
        loading,
        create,
        update
    }
}