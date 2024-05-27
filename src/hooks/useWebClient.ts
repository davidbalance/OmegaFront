import { OmegaWebClientService } from "@/services/api";
import { UpdateWebClientLogoRequestDTO } from "@/services/api/omega-web-client/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { notifications } from "@mantine/notifications";

export const useWebClient = () => {

    const omegaClientService = new OmegaWebClientService(endpoints.OMEGA_WEB_CLIENT.V1);

    const updateWebClientLogo = async ({ logo, user }: UpdateWebClientLogoRequestDTO) => {
        try {
            await omegaClientService.assignLogo({ user: user, logo });
        } catch (error) {
            notifications.show({
                title: 'Error al crear un usuario',
                message: 'Ha ocurrido un error al crear el usuario 😔',
                color: 'red'
            });
            console.error(error);
            throw error;
        }
    }

    return {
        updateWebClientLogo
    }
}