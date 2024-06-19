import { useFetch } from '@/hooks/useFetch';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { ComboboxItem, Modal, Flex, LoadingOverlay, rem, Box, Select, ButtonGroup, Button, ModalProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface MedicalResultFormDiseaseProps extends Omit<ModalProps, 'title'> {
    medicalOrderExam: Omit<MedicalResult, 'order'>;
    onFormSubmitted: (value: MedicalResult) => void;
}
const MedicalResultFormDisease: React.FC<MedicalResultFormDiseaseProps> = ({ medicalOrderExam, onFormSubmitted, onClose, ...props }) => {

    const [selectedDiseaseGroup, setSelectedDiseaseGroup] = useState<SelectorOption<number> | null>(null);
    const [selectedDisease, setSelectedDisease] = useState<SelectorOption<number> | null>(null);
    const [shouldFetchDiseaseSelector, setShouldFetchDiseaseSelector] = useState<boolean>(false);
    const [shouldPatchDisease, setShouldPatchDisease] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const {
        loading: groupLoading,
        data: groups,
        error: groupError
    } = useFetch<SelectorOption<number>[]>('/api/selector/disease/group', 'GET');

    const {
        loading: diseaseLoading,
        data: diseases,
        error: diseaseError,
        reload: diseaseReload
    } = useFetch<SelectorOption<number>[]>(`/api/selector/disease/${selectedDiseaseGroup?.key}`, 'GET', { loadOnMount: false });

    const {
        data: patchServerResponse,
        loading: patchLoading,
        body: patchBody,
        error: patchError,
        reload: patchReload,
        request: patchRequest,
        reset: patchReset
    } = useFetch<any>(`/api/medical/results/${medicalOrderExam ? medicalOrderExam.id : ''}`, 'PATCH', { loadOnMount: false });

    const diseaseGroupsOptions = useMemo(() => groups?.map(e => ({ value: `${e.key}`, label: e.label })) || [], [groups]);
    const diseaseOptions = useMemo(() => diseases?.map(e => ({ value: `${e.key}`, label: e.label })) || [], [diseases]);

    const handleGroupChangeEvent = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedDisease(null);
        setSelectedDiseaseGroup({ key: parseInt(option.value), label: option.label });
        setShouldFetchDiseaseSelector(true);
    }, []);

    const handleDiseaseChangeEvent = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedDisease({ key: parseInt(option.value), label: option.label });
    }, []);

    const handleCloseEvent = useCallback(() => {
        setSelectedDiseaseGroup(null);
        setSelectedDisease(null);
        onClose();
    }, [onClose]);

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (selectedDiseaseGroup && selectedDisease) {
            patchRequest({
                diseaseGroupId: selectedDiseaseGroup.key,
                diseaseGroupName: selectedDiseaseGroup.label,
                diseaseId: selectedDisease.key,
                diseaseName: selectedDisease.label
            });
            setShouldPatchDisease(true);
        }
    }, [patchRequest, selectedDiseaseGroup, selectedDisease]);

    useEffect(() => {
        if (medicalOrderExam) {
            if (medicalOrderExam.diseaseGroupId && medicalOrderExam.diseaseGroupName) {
                setSelectedDiseaseGroup({ key: medicalOrderExam.diseaseGroupId, label: medicalOrderExam.diseaseGroupName });
            }
            if (medicalOrderExam.diseaseId && medicalOrderExam.diseaseName) {
                setSelectedDisease({ key: medicalOrderExam.diseaseId, label: medicalOrderExam.diseaseName });
            }
        }
    }, [medicalOrderExam]);

    useEffect(() => {
        if (selectedDiseaseGroup && shouldFetchDiseaseSelector) {
            diseaseReload();
            setShouldFetchDiseaseSelector(false);
        }
    }, [selectedDiseaseGroup, shouldFetchDiseaseSelector, diseaseReload]);

    useEffect(() => {
        if (groupError) notifications.show({ message: groupError.message, color: 'red' });
        else if (diseaseError) notifications.show({ message: diseaseError.message, color: 'red' });
        else if (patchError) notifications.show({ message: patchError.message, color: 'red' });
    }, [groupError, diseaseError, patchError]);

    useEffect(() => {
        if (shouldPatchDisease && patchBody) {
            patchReload();
            setShouldPatchDisease(false);
        }
    }, [shouldPatchDisease, patchBody, patchReload])

    useEffect(() => {
        if (patchServerResponse && selectedDiseaseGroup && selectedDiseaseGroup && selectedDisease && selectedDisease) {
            const newMedicalResult: Omit<MedicalResult, 'order'> = {
                ...medicalOrderExam,
                diseaseGroupId: selectedDiseaseGroup.key,
                diseaseGroupName: selectedDiseaseGroup.label,
                diseaseId: selectedDisease.key,
                diseaseName: selectedDisease.label
            };
            onFormSubmitted(newMedicalResult as any);
            patchReset();
        }
    }, [
        patchServerResponse,
        selectedDiseaseGroup,
        selectedDisease,
        onFormSubmitted,
        patchReset,
        medicalOrderExam
    ]);

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            onClose={onClose}
            {...props}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    <Modal.Header>
                        <Modal.Title>Formulario de asignación de morbilidades</Modal.Title>
                    </Modal.Header>
                    <Modal.Body flex={1} pos='relative'>
                        <LoadingOverlay visible={groupLoading || diseaseLoading || patchLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                        <Flex component='form' direction='column' gap={rem(12)} h='100%' onSubmit={handleFormSubmittionEvent}>
                            <Box flex={1}>
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
                                    clearable
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
                                    clearable
                                    nothingFoundMessage="Morbilidad no encontrada..."
                                    allowDeselect={false}
                                    maxDropdownHeight={200}
                                />
                            </Box>
                            <ButtonGroup>
                                <Button size='xs' fullWidth variant='outline' onClick={handleCloseEvent}>Cancelar</Button>
                                <Button size='xs' fullWidth type='submit' leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar</Button>
                            </ButtonGroup>
                        </Flex>
                    </Modal.Body>
                </Flex>
            </Modal.Content>
        </Modal.Root>
    )
}

export { MedicalResultFormDisease }