import { useFetch } from '@/hooks/useFetch/useFetch';
import { SelectorOption } from '@/lib';
import { OrderResult } from '@/services/api/order/dtos'
import { Box, Button, ButtonGroup, ComboboxItem, Flex, LoadingOverlay, Modal, ModalProps, Select, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { FormEvent, useEffect, useMemo, useState } from 'react'

interface PatientExamDiseaseModalProps extends Omit<ModalProps, 'title'> {
    medicalOrderExam: OrderResult;
    onFormSubmitted: (value: OrderResult) => void;
}
const PatientExamDiseaseModal: React.FC<PatientExamDiseaseModalProps> = ({ medicalOrderExam, onFormSubmitted, ...props }) => {

    const { loading: groupLoading, data: groups, error: groupError } = useFetch<SelectorOption<number>[]>('/api/selector/disease-group', 'GET');
    const {
        data: patchServerResponse,
        loading: patchLoading,
        error: patchError,
        reload: patchReload,
        request: patchRequest,
        reset: patchReset } = useFetch<SelectorOption<number>[]>(`/api/patients/exam/${medicalOrderExam ? medicalOrderExam.id : 0}`, 'PATCH', { loadOnMount: false });

    const [selectedDiseaseGroup, setSelectedDiseaseGroup] = useState<SelectorOption<number> | null>(null);
    const [selectedDisease, setSelectedDisease] = useState<SelectorOption<number> | null>(null);

    const { loading: diseaseLoading, data: diseases, error: diseaseError, reload: diseaseReload } = useFetch<SelectorOption<number>[]>(`/api/selector/disease/${selectedDiseaseGroup?.key}`, 'GET', { loadOnMount: false });

    const [shouldFetchDiseaseOptions, setShouldFetchDiseaseOptions] = useState<boolean>(false);
    const [shouldPatchExamResult, setShouldPatchExamResult] = useState(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const diseaseGroupsOptions = useMemo(() => groups?.map((e) => ({ value: `${e.key}`, label: e.label })) || [], [groups]);
    const diseaseOptions = useMemo(() => diseases?.map((e) => ({ value: `${e.key}`, label: e.label })) || [], [diseases]);

    const handleGroupChangeEvent = (_: string | null, option: ComboboxItem) => {
        setSelectedDisease(null);
        setSelectedDiseaseGroup({ key: parseInt(option.value), label: option.label });
        setTimeout(() => setShouldFetchDiseaseOptions(true), 500);
    }

    const handleDiseaseChangeEvent = (_: string | null, option: ComboboxItem) => {
        setSelectedDisease({ key: parseInt(option.value), label: option.label });
    }

    const handleCloseEvent = () => {
        setSelectedDiseaseGroup(null);
        setSelectedDisease(null);
        props.onClose();
    }

    const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (selectedDiseaseGroup && selectedDisease) {
            patchRequest<{ diseaseId: number, diseaseName: string, diseaseGroupId: number, diseaseGroupName: string }>({
                diseaseGroupId: selectedDiseaseGroup.key,
                diseaseGroupName: selectedDiseaseGroup.label,
                diseaseId: selectedDisease.key,
                diseaseName: selectedDisease.label
            });
            setTimeout(() => setShouldPatchExamResult(true), 500);
        }
    }

    useEffect(() => {
        if (medicalOrderExam) {
            if (medicalOrderExam.diseaseGroupId && medicalOrderExam.diseaseGroupName) {
                setSelectedDiseaseGroup({ key: medicalOrderExam.diseaseGroupId, label: medicalOrderExam.diseaseGroupName });
                setTimeout(() => setShouldFetchDiseaseOptions(true), 500);
            }
            if (medicalOrderExam.diseaseId && medicalOrderExam.diseaseName) {
                setSelectedDisease({ key: medicalOrderExam.diseaseId, label: medicalOrderExam.diseaseName });
            }
        }
    }, [medicalOrderExam]);

    useEffect(() => {
        if (shouldFetchDiseaseOptions) {
            diseaseReload();
            setShouldFetchDiseaseOptions(false);
        }
    }, [shouldFetchDiseaseOptions]);

    useEffect(() => {
        if (groupError) {
            notifications.show({ message: groupError.message, color: 'red' })
        } else if (diseaseError) {
            notifications.show({ message: diseaseError.message, color: 'red' })
        } else if (patchError) {
            notifications.show({ message: patchError.message, color: 'red' })
        }
    }, [groupError, diseaseError, patchError]);

    useEffect(() => {
        if (shouldPatchExamResult) {
            patchReload();
            setShouldPatchExamResult(false);
        }
    }, [shouldPatchExamResult, patchReload])


    useEffect(() => {
        if (patchServerResponse) {
            const newExam: OrderResult = {
                ...medicalOrderExam,
                diseaseGroupId: selectedDiseaseGroup?.key,
                diseaseGroupName: selectedDiseaseGroup?.label,
                diseaseId: selectedDisease?.key,
                diseaseName: selectedDisease?.label
            }
            onFormSubmitted(newExam);
            patchReset();
        }
    }, [patchServerResponse, onFormSubmitted, patchReset, medicalOrderExam])

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            {...props}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    <Modal.Header>
                        <Modal.Title>Formulario de asignacion de morbilidades</Modal.Title>
                    </Modal.Header>
                    <Modal.Body flex={1} pos='relative'>
                        <LoadingOverlay visible={groupLoading || diseaseLoading || patchLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Flex component='form' direction='column' gap={rem(12)} h='100%' onSubmit={handleSubmit}>
                            <Box flex={1}>
                                <Select
                                    value={`${selectedDiseaseGroup?.key}`}
                                    data={diseaseGroupsOptions}
                                    checkIconPosition="left"
                                    onChange={handleGroupChangeEvent}
                                    label="Grupo de morbilidades"
                                    pb={rem(16)}
                                    placeholder="Escoge un grupo de morbilidades"
                                    searchable
                                    nothingFoundMessage="Grupo de morbilidades no encontrado..."
                                    allowDeselect={false}
                                />

                                <Select
                                    pb={rem(16)}
                                    checkIconPosition="left"
                                    onChange={handleDiseaseChangeEvent}
                                    value={selectedDisease ? `${selectedDisease.key}` : ''}
                                    data={diseaseOptions}
                                    label="Morbilidades"
                                    placeholder="Escoge una morbilidad"
                                    searchable
                                    nothingFoundMessage="Morbilidad no encontrada..."
                                    allowDeselect={false}
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

export { PatientExamDiseaseModal }