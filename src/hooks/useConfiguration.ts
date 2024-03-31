import { getConfiguration } from "@/lib/configuration.lib";
import { LinkProp } from "@/lib/type.lib";
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