import { SelectorOption } from "@/lib";
import { DiseaseGroupService } from "@/services/api";
import { CreateDiseaseGroupRQ, DeleteDiseaseGroupRQ, DiseaseGroup, UpdateDiseaseGroupRQ } from "@/services/api/disease-group/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useDiseaseGroup = (loadOnStart: boolean = false) => {
    const diseaseGroupService = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

    const [loading, Disclosure] = useDisclosure();
    const [diseaseGroups, setDiseaseGroups] = useState<DiseaseGroup[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, []);


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

    return {
        loading,
        diseaseGroups,
        options,
        create,
        find,
        update,
        remove,
        loadOptions
    }

}