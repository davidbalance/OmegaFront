import { ApiKey, ApiKeyService, CreateApiKeyRQ, DeleteApiKeyRQ, UpdateApiKeyRQ } from "@/services/api/api-key";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useLayoutEffect, useState } from "react"

const useApiKey = (loadOnStart: boolean = false) => {

    const [loading, Disclosure] = useDisclosure();

    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    const apiKeyService = new ApiKeyService(endpoints.API_KEY.V1);

    useLayoutEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const create = async ({ ...params }: CreateApiKeyRQ): Promise<string> => {
        Disclosure.open();
        try {
            const key = await apiKeyService.create(params);
            Disclosure.close();
            return key;
        } catch (error) {
            notifications.show({
                title: 'Error al crear la ApiKey',
                message: 'Se produjo un error al crear la ApiKey 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const find = async () => {
        Disclosure.open();
        try {
            const foundKeys = await apiKeyService.find();
            setApiKeys(foundKeys || []);
            Disclosure.close();
            return foundKeys;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener la ApiKey',
                message: 'Se produjo un error al buscar la ApiKey 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const update = async ({ id, ...params }: UpdateApiKeyRQ) => {
        Disclosure.open();
        try {
            await apiKeyService.findOneAndUpdate({ id, ...params });
            const index = apiKeys.findIndex((u) => u.id === id);
            const newKeys = apiKeys;
            newKeys[index] = { ...newKeys[index], ...params };
            setApiKeys(newKeys);
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al actualizar la ApiKey',
                message: 'Se produjo un error al actualizar la ApiKey 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const remove = async ({ id }: DeleteApiKeyRQ) => {
        Disclosure.open();
        try {
            await apiKeyService.findOneAndDelete({ id });
            const newKeys = apiKeys.filter(e => e.id !== id);
            setApiKeys(newKeys);
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al eliminar la ApiKey',
                message: 'Se produjo un error al eliminar la ApiKey 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const selectItem = (index: number) => setIndex(index);
    const clearSelection = () => setIndex(undefined);

    return {
        loading,
        apiKeys,
        apiKey: index !== undefined ? apiKeys[index] : undefined,
        find,
        create,
        update,
        remove,
        selectItem,
        clearSelection
    }
}

export { useApiKey };