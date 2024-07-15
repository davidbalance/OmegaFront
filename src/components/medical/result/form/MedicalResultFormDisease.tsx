import { useFetch } from '@/hooks/useFetch';
import { DiseaseGroup } from '@/lib/dtos/disease/group/response.dto';
import { Disease } from '@/lib/dtos/disease/response.dto';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { ComboboxItem, LoadingOverlay, rem, Box, Select, Button, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface MedicalResultFormDiseaseProps {
    /**
     * Objeto de resultado medico que inicializa el formulario.
     */
    disease?: Omit<MedicalResultDisease, 'id'> | null
    /**
     * Funcion que es invocada cuando el formulario es enviado.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: Omit<MedicalResultDisease, 'id'>) => void;
}
const MedicalResultFormDisease = React.forwardRef<HTMLButtonElement, MedicalResultFormDiseaseProps>(({ disease, onFormSubmitted }, ref) => {

    const [selectedDiseaseGroup, setSelectedDiseaseGroup] = useState<SelectorOption<number> | null>(null);
    const [selectedDisease, setSelectedDisease] = useState<SelectorOption<number> | null>(null);
    const [currentDiseases, setCurrentDiseases] = useState<Disease[]>([]);
    const [commentary, setCommentary] = useState<string>("");

    const {
        loading: groupLoading,
        data: groups,
        error: groupError
    } = useFetch<DiseaseGroup[]>('/api/diseases/groups', 'GET');

    const diseaseGroupsOptions = useMemo(() => groups?.map(e => ({ value: `${e.id}`, label: e.name })) || [], [groups]);
    const diseaseOptions = useMemo(() => currentDiseases?.map(e => ({ value: `${e.id}`, label: e.name })) || [], [currentDiseases]);

    const cleanForm = useCallback(() => {
        setSelectedDisease(null);
        setSelectedDisease(null);
        setCommentary("")
        setCurrentDiseases([]);
    }, []);

    useEffect(() => {
        if (disease && groups) {
            setSelectedDiseaseGroup({ key: disease.diseaseGroupId, label: disease.diseaseGroupName });
            setSelectedDisease({ key: disease.diseaseId, label: disease.diseaseName });
            setCommentary(disease.diseaseCommentary);

            const currentDiseaseGroup = groups.find((e) => e.id === disease.diseaseGroupId);
            if (currentDiseaseGroup) {
                setCurrentDiseases(currentDiseaseGroup.diseases || []);
            }
        } else {
            cleanForm();
        }
    }, [disease, groups, cleanForm]);

    const handleGroupChangeEvent = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedDisease(null);
        setSelectedDiseaseGroup({ key: parseInt(option.value), label: option.label });
        if (groups) {
            const currentDiseaseGroup = groups.find((e) => e.id === parseInt(option.value));
            if (currentDiseaseGroup) {
                setCurrentDiseases(currentDiseaseGroup.diseases || []);
            }
        }
    }, [groups]);

    const handleDiseaseChangeEvent = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedDisease({ key: parseInt(option.value), label: option.label });
    }, []);

    const handleCommentaryChangeEvent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentary(event.target.value);
    }, []);

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedDiseaseGroup && selectedDisease) {
            onFormSubmitted({
                diseaseGroupId: selectedDiseaseGroup.key,
                diseaseGroupName: selectedDiseaseGroup.label,
                diseaseId: selectedDisease.key,
                diseaseName: selectedDisease.label,
                diseaseCommentary: commentary
            });
            cleanForm();
        }
    }, [onFormSubmitted, commentary, selectedDiseaseGroup, selectedDisease, cleanForm]);

    useEffect(() => {
        if (groupError) notifications.show({ message: groupError.message, color: 'red' });
    }, [groupError]);

    return (
        <Box component='form' h='100%' onSubmit={handleFormSubmittionEvent} pos='relative'>
            <LoadingOverlay visible={groupLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <Box pos='relative'>
                <Select
                    value={`${selectedDiseaseGroup?.key || ''}`}
                    data={diseaseGroupsOptions}
                    checkIconPosition="left"
                    onChange={handleGroupChangeEvent}
                    label="Grupo de morbilidades"
                    pb={rem(16)}
                    placeholder="Escoge un grupo de morbilidades"
                    searchable
                    defaultDropdownOpened={false}
                    nothingFoundMessage="Grupo de morbilidades no encontrado..."
                    allowDeselect={false}
                    maxDropdownHeight={200}
                />
                <Select
                    value={`${selectedDisease?.key || ''}`}
                    data={diseaseOptions}
                    checkIconPosition="left"
                    onChange={handleDiseaseChangeEvent}
                    label="Morbilidades"
                    pb={rem(16)}
                    placeholder="Escoge una morbilidad"
                    searchable
                    defaultDropdownOpened={false}
                    nothingFoundMessage="Morbilidad no encontrada..."
                    allowDeselect={false}
                    maxDropdownHeight={200}
                />

                <Textarea
                    label="Comentario"
                    value={commentary}
                    placeholder="Comentario de la morbilidad"
                    autosize
                    minRows={2}
                    maxRows={8}
                    onChange={handleCommentaryChangeEvent}
                    required
                />
            </Box>
            <Button type='submit' style={{ display: 'none' }} ref={ref}></Button>
        </Box>
    )
});

MedicalResultFormDisease.displayName = 'MedicalResultFormDisease';

export { MedicalResultFormDisease }