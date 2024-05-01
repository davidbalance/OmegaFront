import { SelectorOption } from "@/lib";
import { DiseaseService } from "@/services/api";
import { CreateDiseaseRQ, DeleteDiseaseRQ, Disease, UpdateDiseaseRQ } from "@/services/api/disease/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useDisease = (loadOnStart: boolean = false) => {
    const diseaseService = new DiseaseService(endpoints.DISEASE.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, [])


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

    const loadOptions = async () => {
        Disclosure.open();
        try {
            const options = await diseaseService.findSelectorOptions();
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