
import { removeConfiguration, removeTokens, setConfiguration, setTokens } from "@/lib";
import { ConfigurationUser, getUser, removeUser, setUser } from "@/lib/user.lib";
import { AuthenticationService, OmegaWebClientService, UserService } from "@/services/api";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export const useAuth = () => {
    const authenticationService = new AuthenticationService(endpoints.AUTHENTICATION.V1);
    const omegaClientService = new OmegaWebClientService(endpoints.OMEGA_WEB_CLIENT.V1);
    const userService = new UserService(endpoints.USER.V1);

    const router = useRouter();
    const [loading, { open, close }] = useDisclosure();

    const [configurationUser, setConfigurationUser] = useState<ConfigurationUser | undefined>(undefined)

    useLayoutEffect(() => {
        setConfigurationUser(getUser());
        return () => { }
    }, []);

    const login = async (values: { username: string, password: string, keepmeLogged?: boolean }) => {
        try {
            open();
            const tokens = await authenticationService.login(values);
            setTokens(tokens);
            const configuration = await omegaClientService.findOne({});
            setConfiguration(configuration);
            const user = await userService.findOne({});
            delete user.id;
            setUser(user);
            router.refresh();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error al iniciar sesion',
                message: 'El usuario o la contraseña es incorrecta',
                color: 'orange'
            });
            close();
        }
    }

    const logout = async () => {
        try {
            await authenticationService.logout();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Se ha producido un error',
                message: 'No se ha cerrado la sesion de forma correcta',
                color: 'red'
            });
        } finally {
            removeConfiguration();
            removeTokens();
            removeUser();
            router.refresh();
        }
    }

    return {
        loading,
        login,
        logout,
        user: configurationUser
    }
}