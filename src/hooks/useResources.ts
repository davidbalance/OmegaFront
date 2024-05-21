import { SelectorOption } from "@/lib";
import { ResourceService } from "@/services/api";
import { Resource } from "@/services/api/resource/dtos";import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";


export const useResource = (loadOnStart: boolean = false) => {
    const resourceService = new ResourceService(endpoints.RESOURCE.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [resources, setResources] = useState<Resource[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const find = async () => {
        Disclosure.open();
        try {
            const resources = await resourceService.find();
            setResources(resources);
            Disclosure.close();
            return resources;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los datos',
                message: 'Se produjo un error al obtener los datos 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const loadOptions = async () => {
        Disclosure.open();
        try {
            const resources = await resourceService.find();
            setResources(resources)
            Disclosure.close();
            return resources;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los datos',
                message: 'Se produjo un error al obtener los datos 😔',
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
        resources,
        resource: index !==undefined ? resources[index] : undefined,
        options,
        find,
        loadOptions,
        selectItem,
        clearSelected
    }

}