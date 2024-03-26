import { getConfiguration } from "@/lib/configuration.lib";
import { LinkProp } from "@/lib/interfaces.lib";
import { useEffect, useState } from "react"

export const useConfiguration = () => {
    const [routes, setRoutes] = useState<LinkProp[]>([]);

    useEffect(() => {
        const configuration = getConfiguration();
        setRoutes(configuration.routes || []);
        return () => { }
    }, [])

    return { routes }
}