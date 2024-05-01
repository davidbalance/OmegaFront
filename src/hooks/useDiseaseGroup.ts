import { SelectorOption } from "@/lib";
import { DiseaseGroupService } from "@/services/api";
import { CreateDiseaseGroupRQ, DeleteDiseaseGroupRQ, DiseaseGroup, UpdateDiseaseGroupRQ } from "@/services/api/disease-group/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export enum ELoadDiseaseOnStart {
    FIND_ALL,
    LOAD_OPTIONS
}

type DiseaseGroupHook = {
    loading: boolean;
    diseaseGroups: DiseaseGroup[];
    diseaseGroup: DiseaseGroup | undefined;
    options: SelectorOption<number>[];
    create: (dto: CreateDiseaseGroupRQ) => DiseaseGroup | Promise<DiseaseGroup>;
    find: () => DiseaseGroup[] | Promise<DiseaseGroup[]>;
    update: ({ id, ...params }: UpdateDiseaseGroupRQ) => DiseaseGroup | Promise<DiseaseGroup>;
    remove: ({ id, ...params }: DeleteDiseaseGroupRQ) => void | Promise<void>;
    loadOptions: () => SelectorOption<number>[] | Promise<SelectorOption<number>[]>;
    selectItem: (index: number) => void;
    clearSelection: () => void;
}

export function useDiseaseGroup(): DiseaseGroupHook;
export function useDiseaseGroup(loadOnStart: ELoadDiseaseOnStart): DiseaseGroupHook;
export function useDiseaseGroup(loadOnStart: ELoadDiseaseOnStart[]): DiseaseGroupHook;
export function useDiseaseGroup(loadOption?: ELoadDiseaseOnStart | ELoadDiseaseOnStart[]): DiseaseGroupHook {
    const diseaseGroupService = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

    const [loading, Disclosure] = useDisclosure();
    const [diseaseGroups, setDiseaseGroups] = useState<DiseaseGroup[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        if (loadOption === undefined) return;
        let optionArray: ELoadDiseaseOnStart[];
        if (Array.isArray(loadOption)) {
            optionArray = loadOption;
        } else {
            optionArray = [loadOption];
        }
        loadOnStart(optionArray);

        return () => { }
    }, []);

    const loadOnStart = (loadOnStartOptions: ELoadDiseaseOnStart[]) => {
        for (const option of loadOnStartOptions) {
            switch (option) {
                case ELoadDiseaseOnStart.FIND_ALL:
                    find();
                    break;
                case ELoadDiseaseOnStart.LOAD_OPTIONS:
                    loadOptions();
                    break;
                default:
                    break;
            }
        }
    }


    const create = async (dto: CreateDiseaseGroupRQ) => {
        Disclosure.open();
        try {
            const group = await diseaseGroupService.create(dto);
            setDiseaseGroups([...diseaseGroups, group]);
            Disclosure.close();
            return group;
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

    const find = async () => {
        Disclosure.open();
        try {
            const groups = await diseaseGroupService.find();
            setDiseaseGroups(groups);
            Disclosure.close();
            return groups;
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

    const update = async ({ id, ...params }: UpdateDiseaseGroupRQ) => {
        Disclosure.open();
        try {
            const group = await diseaseGroupService.findOneAndUpdate({ id, ...params });
            const index = diseaseGroups.findIndex(e => e.id === id);
            const newGroups = diseaseGroups;
            newGroups[index] = group;
            setDiseaseGroups(newGroups);
            Disclosure.close();
            return group;
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

    const remove = async ({ id, ...params }: DeleteDiseaseGroupRQ) => {
        Disclosure.open();
        try {
            await diseaseGroupService.findOneAndDelete({ id, ...params });
            const newGroups = diseaseGroups.filter(e => e.id !== id);
            setDiseaseGroups(newGroups);
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

    const loadOptions = async () => {
        Disclosure.open();
        try {
            const options = await diseaseGroupService.findSelectorOptions();
            setOptions(options);
            Disclosure.close();
            return options;
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

    const selectItem = (index: number) => setIndex(index);
    const clearSelection = () => setIndex(undefined);

    return {
        loading,
        diseaseGroups,
        diseaseGroup: index !== undefined ? diseaseGroups[index] : undefined,
        options,
        create,
        find,
        update,
        remove,
        loadOptions,
        selectItem,
        clearSelection
    }

}