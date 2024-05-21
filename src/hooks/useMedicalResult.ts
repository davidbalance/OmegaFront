import { MedicalResultService } from "@/services/api";
import { FindMedicalResultFileRQ, InsertMedicalReportRQ, MedicalResult, UpdateMedicalResultRQ } from "@/services/api/medical-result/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useMedicalResult = (loadOnStart: boolean = false) => {
    const medicalResultService = new MedicalResultService(endpoints.MEDICAL_RESULT.V1);

    const [loading, Disclosure] = useDisclosure();
    const [medicalResults, setMedicalResults] = useState<MedicalResult[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const find = async () => {
        Disclosure.open();
        try {
            const results = await medicalResultService.find();
            setMedicalResults(results);
            Disclosure.close();
            return results;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener resultados medicos',
                message: 'Ha ocurrido un error al obtener los resultados medicos 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const findFile = async ({ id, ...params }: FindMedicalResultFileRQ) => {
        Disclosure.open();
        try {
            await medicalResultService.findFile({ id, ...params });
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al actualizar un resultado',
                message: 'Ha ocurrido un error al actualizar el resultado 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const updateDisease = async ({ id, ...params }: UpdateMedicalResultRQ) => {
        Disclosure.open();
        try {
            await medicalResultService.findOneAndUpdate({ id, ...params });
            const newResults = medicalResults.map(e => {
                if (e.id === id) {
                    return {
                        ...e,
                        diseaseId: params.diseaseId,
                        diseaseName: params.diseaseName
                    }
                }
                return e;
            });
            setMedicalResults(newResults);
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al actualizar un resultado',
                message: 'Ha ocurrido un error al actualizar el resultado 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const insertMedicalReport = async ({ id, ...params }: InsertMedicalReportRQ) => {
        Disclosure.open();
        try {
            const medicalResult = await medicalResultService.findOneAndInsertReport({ id, ...params });
            const index = medicalResults.findIndex(e => e.id, id);
            const newResults = medicalResults;
            newResults[index] = medicalResult;
            setMedicalResults(newResults);
            Disclosure.close();
            return medicalResult;
        } catch (error) {
            notifications.show({
                title: 'Error al actualizar un resultado',
                message: 'Ha ocurrido un error al actualizar el resultado 😔',
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
        medicalResults,
        medicalResult: index !== undefined ? medicalResults[index] : undefined,
        find,
        findFile,
        updateDisease,
        insertMedicalReport,
        selectItem,
        clearSelection
    }
}