import { LoadingOverlay, rem, Flex, Button, Box } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { notifications } from '@mantine/notifications';
import { useFetch } from '@/hooks/useFetch';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { Management } from '@/lib/dtos/location/management/response.dto';
import { MedicalClientFormManagementArea } from './MedicalClientFormManagementArea';
import { MedicalClientManagement } from '@/lib/dtos/medical/client/management/base.response.dto';
import { PostMedicalClientManagementRequestDto } from '@/lib/dtos/medical/client/management/request.dto';

type MedicalClientFormManagementAreaCreateProps = {
    /**
     * Patient dni
     */
    dni: string;
    /**
     * Funcion que es invocada cuando llama al evento de cierre del formulario.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es invocada cuando se envia el formulario.
     * @param user 
     * @returns 
     */
    onFormSubmit?: () => void;
}

const MedicalClientFormManagementAreaCreate: React.FC<MedicalClientFormManagementAreaCreateProps> = ({ dni, onClose, onFormSubmit }) => {

    const {
        data: dataGETManagement,
        error: errorGETManagement,
        loading: loadingGETManagement,
    } = useFetch<Management[]>(`/api/management`, 'GET');

    const {
        data: dataGETClient,
        error: errorGETClient,
        loading: loadingGETClient,
    } = useFetch<MedicalClientManagement>(`/api/medical/client/management/area/${dni ? dni : ''}`, 'GET');

    const {
        data: dataPOSTClient,
        error: errorPOSTClient,
        loading: loadingPOSTClient,
        body: bodyPOSTClient,
        request: requestPOSTClient,
        reload: reloadPOSTClient,
        reset: resetPOSTClient,
    } = useFetch<any>(`/api/medical/client/management/area/${dni ? dni : ''}`, 'POST', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const managementOptions = useMemo(() => dataGETManagement || [], [dataGETManagement]);

    const medicalClientDefaultValue = useMemo((): {
        management: SelectorOption<number>,
        area: SelectorOption<number>
    } | undefined => (dataGETClient &&
        dataGETClient.areaId &&
        dataGETClient.areaName &&
        dataGETClient.managementId &&
        dataGETClient.managementName) ? {
            area: {
                key: dataGETClient.areaId,
                label: dataGETClient.areaName
            },
            management: {
                key: dataGETClient.managementId,
                label: dataGETClient.managementName
            }
        } : undefined, [dataGETClient]);

    const handleFormSubmittionEvent = useCallback((form: {
        managementId: number;
        managementName: string;
        areaId: number;
        areaName: string;
    }) => {
        requestPOSTClient<PostMedicalClientManagementRequestDto>(form);
        setShouldSendRequest(true);
        onFormSubmit?.();
    }, [onFormSubmit, requestPOSTClient]);

    useEffect(() => {
        if (errorGETManagement) notifications.show({ message: errorGETManagement.message, color: 'red' });
        else if (errorGETClient) notifications.show({ message: errorGETClient.message, color: 'red' });
        else if (errorPOSTClient) notifications.show({ message: errorPOSTClient.message, color: 'red' });
    }, [errorGETManagement, errorGETClient, errorPOSTClient]);

    useEffect(() => {
        if (shouldSendRequest && bodyPOSTClient) {
            reloadPOSTClient();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, reloadPOSTClient, bodyPOSTClient]);

    useEffect(() => {
        if (dataPOSTClient) {
            onFormSubmit?.();
            onClose?.();
            resetPOSTClient();
        }
    }, [dataPOSTClient, onFormSubmit, resetPOSTClient, onClose]);

    return (
        <>
            <LoadingOverlay visible={loadingGETClient || loadingPOSTClient || loadingGETManagement} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={'Formulario de modificacion de usuario'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <MedicalClientFormManagementArea
                            ref={buttonRef}
                            defaultValue={medicalClientDefaultValue}
                            managements={managementOptions}
                            onFormSubmittion={handleFormSubmittionEvent} />
                    </Box>
                </ModularBox>

                <ModularBox direction='row'>
                    <Button
                        flex={1}
                        size='xs'
                        onClick={() => buttonRef.current?.click()}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />}>
                        Guardar
                    </Button>
                </ModularBox>

            </Flex>
        </>
    )
}

export { MedicalClientFormManagementAreaCreate };