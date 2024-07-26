import { useList } from '@/hooks/useList';
import { Box, Button, Flex, Grid, LoadingOverlay, Modal, ModalProps, rem, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MedicalResultFormDisease } from '../form/MedicalResultFormDisease';
import { IconDeselect, IconDeviceFloppy } from '@tabler/icons-react';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import MedicalResultListElement from '../disease/list/MedicalResultListElement';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto';
import { PatchMedicalResultDiseaseRequestDto, PostMedicalResultDiseaseRequestDto } from '@/lib/dtos/medical/result/disease/request.dto';

interface MedicalResultModalDiseasesProps extends Omit<ModalProps, 'title'> {
    /**
     * Objeto de resultado medico que inicializa el formulario.
     */
    medicalResult: MedicalResult;
    /**
     * Funcion que es invocada cuando el formulario es enviado.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: MedicalResult) => void;
}
const MedicalResultModalDiseases: React.FC<MedicalResultModalDiseasesProps> = ({ medicalResult, onFormSubmitted, onClose, ...props }) => {

    const [selectedDisease, setSelectedDisease] = useState<MedicalResultDisease | null>(null);
    const [shouldSendPOST, setShouldSendPOST] = useState<boolean>(false);
    const [shouldSendPATCH, setShouldSendPATCH] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [diseases, {
        append: appendDisease,
        override: overrideDisease,
        remove: removeDisease,
        update: updateDisease,
    }] = useList<MedicalResultDisease>([]);

    const {
        body: diseasePOSTBody,
        data: diseasePOSTData,
        error: diseasePOSTError,
        loading: diseasePOSTLoading,
        reload: diseasePOSTReload,
        request: diseasePOSTRequest,
        reset: diseasePOSTReset,
    } = useFetch<MedicalResultDisease>(`/api/medical/results/diseases`, 'POST', { loadOnMount: false });

    const {
        body: diseasePATCHBody,
        data: diseasePATCHData,
        error: diseasePATCHError,
        loading: diseasePATCHLoading,
        reload: diseasePATCHReload,
        request: diseasePATCHRequest,
        reset: diseasePATCHReset,
    } = useFetch<MedicalResultDisease>(`/api/medical/results/diseases/${selectedDisease ? selectedDisease.id : ''}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittionEvent = useCallback((value: Omit<MedicalResultDisease, 'id'>, id: number | null = null) => {
        if (id) {
            diseasePATCHRequest<PatchMedicalResultDiseaseRequestDto>(value);
            setShouldSendPATCH(true);
        } else {
            diseasePOSTRequest<PostMedicalResultDiseaseRequestDto>({ ...value, medicalResultId: medicalResult.id });
            setShouldSendPOST(true);
        }
    }, [diseasePATCHRequest, diseasePOSTRequest]);

    const handleCloseEvent = useCallback(() => {
        onFormSubmitted?.({ ...medicalResult, diseases: diseases });
        onClose();
    }, [diseases, medicalResult, onClose, onFormSubmitted]);

    useEffect(() => {
        if (medicalResult && medicalResult.diseases?.length) {
            overrideDisease(medicalResult.diseases);
        }
    }, [medicalResult, overrideDisease]);

    useEffect(() => {
        if (diseasePOSTError) notifications.show({ message: diseasePOSTError.message, color: 'red' });
        else if (diseasePATCHError) notifications.show({ message: diseasePATCHError.message, color: 'red' });
    }, [diseasePOSTError, diseasePATCHError]);

    useEffect(() => {
        if (shouldSendPATCH && diseasePATCHBody) {
            diseasePATCHReload();
            setShouldSendPATCH(false);
        }
    }, [shouldSendPATCH, diseasePATCHBody, diseasePATCHReload]);

    useEffect(() => {
        if (shouldSendPOST && diseasePOSTBody) {
            diseasePOSTReload();
            setShouldSendPOST(false);
        }
    }, [shouldSendPOST, diseasePOSTBody, diseasePOSTReload]);

    useEffect(() => {
        if (diseasePOSTData) {
            appendDisease(diseasePOSTData);
            diseasePOSTReset();
        }
    }, [diseasePOSTData, appendDisease, diseasePOSTReset]);

    useEffect(() => {
        if (diseasePATCHData) {
            updateDisease('id', diseasePATCHData.id, diseasePATCHData);
            diseasePATCHReset();
        }
    }, [diseasePATCHData, updateDisease, diseasePATCHReset]);

    const handleDiseaseRowDeleteEvent = useCallback((id: number) => {
        removeDisease('id', id);
    }, [removeDisease]);

    const handleDiseaseRowClickEvent = useCallback((data: MedicalResultDisease) => setSelectedDisease(data), []);

    const diseaseRows = useMemo(() => diseases.map((row) => (
        <MedicalResultListElement
            key={row.id}
            medicalResult={medicalResult.id}
            active={selectedDisease?.id === row.id}
            onClick={() => handleDiseaseRowClickEvent(row)}
            disease={row}
            onDelete={handleDiseaseRowDeleteEvent} />
    )), [diseases, selectedDisease, handleDiseaseRowClickEvent, handleDiseaseRowDeleteEvent, medicalResult]);

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            onClose={handleCloseEvent}
            size='xl'
            {...props}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    <Modal.Header>
                        <Modal.Title>Formulario de asignación de morbilidades</Modal.Title>
                        <Modal.CloseButton disabled={diseasePOSTLoading || diseasePATCHLoading} />
                    </Modal.Header>
                    <Modal.Body flex={1} pos='relative'>
                        <Grid>
                            <Grid.Col span={isMobile ? 12 : 6} pos='relative'>
                                <LoadingOverlay visible={diseasePOSTLoading || diseasePATCHLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                                <Flex direction='column' gap={rem(16)} h='100%'>
                                    <Box flex={1}>
                                        <MedicalResultFormDisease
                                            ref={buttonRef}
                                            disease={selectedDisease}
                                            onFormSubmitted={(e) => handleFormSubmittionEvent(e, selectedDisease?.id)} />
                                    </Box>
                                    <Button
                                        size='xs'
                                        fullWidth
                                        type='submit'
                                        onClick={() => buttonRef.current?.click()}
                                        leftSection={(
                                            <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                        )}>
                                        Guardar
                                    </Button>

                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={isMobile ? 12 : 6}>
                                <Button
                                    onClick={() => setSelectedDisease(null)}
                                    variant='light'
                                    fullWidth
                                    mb={rem(8)}
                                    size='compact-xs'
                                    leftSection={(
                                        <IconDeselect style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Quitar seleccion
                                </Button>
                                <ScrollArea h={rem(300)}>
                                    <Flex direction='column' gap={rem(8)}>
                                        {diseaseRows}
                                    </Flex>
                                </ScrollArea>
                            </Grid.Col>
                        </Grid>
                    </Modal.Body>
                </Flex>
            </Modal.Content>
        </Modal.Root>
    )
}

export { MedicalResultModalDiseases }