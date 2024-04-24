import { getConfiguration } from "@/lib/configuration.lib";
import { NavLinkProp } from "@/lib/types/nav-link.type";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react"

export const useConfiguration = () => {
    const [routes, setRoutes] = useState<NavLinkProp[]>([]);
    // const [logo, setLogo] = useState<LogoProp | undefined>();

    useEffect(() => {
        const configuration = getConfiguration();
        if (!configuration) {
            notifications.show({
                title: 'Error de configuracion',
                message: "No se ha cargado correctamente el sistema, favor iniciar sesion nuevamente",
                color: 'red'
            });
            return;
        };
        setRoutes(configuration.resources || []);
        // setLogo(configuration.logo);
        return () => { }
    }, [])

    return { routes }
}