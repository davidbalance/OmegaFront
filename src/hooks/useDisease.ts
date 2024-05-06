import { SelectorOption } from "@/lib";
import { DiseaseService } from "@/services/api";
import { CreateDiseaseRQ, DeleteDiseaseRQ, Disease, UpdateDiseaseRQ } from "@/services/api/disease/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export enum ELoadDiseaseOnStart {
    FIND_ALL,
    LOAD_OPTIONS
}

type DiseaseHook = {
    loading: boolean;
    diseases: Disease[];
    disease: Disease | undefined;
    options: SelectorOption<number>[];
    create: (dto: CreateDiseaseRQ) => Disease | Promise<Disease>;
    find: () => Disease[] | Promise<Disease[]>;
    update: (dto: UpdateDiseaseRQ) => Disease | Promise<Disease>;
    remove: (dto: DeleteDiseaseRQ) => void | Promise<void>;
    loadOptions: (group: number) => void | Promise<void>;
    selectItem: (index: number) => void;
    clearSelected: () => void;
}

export function useDisease(): DiseaseHook;
export function useDisease(loadOnStart: ELoadDiseaseOnStart): DiseaseHook;
export function useDisease(loadOnStart: ELoadDiseaseOnStart[]): DiseaseHook;
export function useDisease(loadOption?: ELoadDiseaseOnStart | ELoadDiseaseOnStart[]): DiseaseHook {
    const diseaseService = new DiseaseService(endpoints.DISEASE.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [diseases, setDiseases] = useState<Disease[]>([]);
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
                    loadOptions(0);
                    break;
                default:
                    break;
            }
        }
    }

    const create = async (dto: CreateDiseaseRQ) => {
        Disclosure.open();
        try {
            const disease = await diseaseService.create(dto);
            setDiseases([...diseases, disease]);
            Disclosure.close();
            return disease;
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
            const diseases = await diseaseService.find();
            setDiseases(diseases);
            Disclosure.close();
            return diseases;
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

    const update = async ({ id, ...params }: UpdateDiseaseRQ) => {
        Disclosure.open();
        try {
            const disease = await diseaseService.findOneAndUpdate({ id, ...params });
            const index = diseases.findIndex(e => e.id === id);
            const newDiseases = diseases;
            newDiseases[index] = disease;
            setDiseases(newDiseases);
            Disclosure.close();
            return disease;
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

    const remove = async ({ id, ...params }: DeleteDiseaseRQ) => {
        Disclosure.open();
        try {
            await diseaseService.findOneAndDelete({ id, ...params });
            const newDiseases = diseases.filter(e => e.id !== id);
            setDiseases(newDiseases);
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

    const loadOptions = async (group: number) => {
        Disclosure.open();
        try {
            const options = await diseaseService.findSelectorOptions({ group });
            setOptions(options);
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

    const selectItem = (index: number) => setIndex(index);
    const clearSelected = () => setIndex(undefined);

    return {
        loading,
        diseases,
        disease: index !== undefined ? diseases[index] : undefined,
        options,
        create,
        find,
        update,
        remove,
        loadOptions,
        selectItem,
        clearSelected
    }

}