import { ApiKey, CreateApiKeyRQ } from "@/services/api/api-key/dtos";
import { ApiKeyService } from "@/services/api/api-key";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useApiKey = () => {
    const apiKeyService = new ApiKeyService(endpoints.API_KEY.V1)

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);

    const create = async (dto: CreateApiKeyRQ) => {
        Disclosure.open();
        try {
            const group = await apiKeyService.create(dto);
            Disclosure.close();
            return group;
        } catch (error) {
            notifications.show({
                title: 'Error al crear',
                message: 'Se produjo un error al crear 😔',
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
        create,
        selectItem,
        clearSelected
    }
}