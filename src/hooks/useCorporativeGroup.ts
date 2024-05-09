import { SelectorOption } from "@/lib";
import { CorporativeGroupService } from "@/services/api";
import { CorporativeGroup } from "@/services/api/corporative-group/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { CorporativeGroupEndpoint } from "@/services/endpoints/v1";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useCorporativeGroup = (loadOnStart: boolean = false) => {
    const corporativeGroupService = new CorporativeGroupService(endpoints.CORPORATIVE_GROUP.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [corporativeGroups, setCorporativeGroups] = useState<CorporativeGroup[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, [])


    const find = async () => {
        Disclosure.open();
        try {
            const corporativeGroups = await corporativeGroupService.find();
            setCorporativeGroups(corporativeGroups);
            Disclosure.close();
            return corporativeGroups;
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
            const options = await corporativeGroupService.findSelectorOptions();
            setOptions(options);
            Disclosure.close();
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
        corporativeGroups,
        corporativeGroup: index !==undefined ? corporativeGroups[index] : undefined,
        options,
        find,
        loadOptions,
        selectItem,
        clearSelected
    }

}