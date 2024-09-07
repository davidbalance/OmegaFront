import { LoadingOverlay, rem, Button, Flex } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ManagementForm } from './management-form';
import { Management } from '@/lib/dtos/location/management/base.response.dto';

type ManagementFormUpdateProps = {
    /**
     * Grupo de morbilidad para inicializar el formulario.
     */
    management: Management;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: Management) => void;
}
const ManagementFormUpdate: React.FC<ManagementFormUpdateProps> = ({ onClose, onFormSubmitted, management }) => {

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const {
        body,
        data,
        error,
        loading,
        reload,
        request,
        reset
    } = useFetch<Management>(`/api/management/${management ? management.id : ''}`, 'PATCH', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<Management, 'id' | 'areas'>) => {
        request({ ...management, ...data });
        setShouldSendRequest(true);
    }, [request, management]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (body && shouldSendRequest) {
            reload();
            setShouldSendRequest(false);
        }
    }, [body, reload, shouldSendRequest]);

    useEffect(() => {
        if (data && body) {
            onFormSubmitted({ ...management, ...body });
            onClose();
            reset();
        }
    }, [data, management, body, reset, onFormSubmitted, onClose]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de modificacion de gerencia'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <ManagementForm
                    ref={buttonRef}
                    formData={management}
                    onFormSubmitted={handleFormSubmittedEvent} />
            </ModularBox>

            <ModularBox direction='row'>
                <Button
                    onClick={handleClickEvent}
                    type="submit"
                    flex={1}
                    size='xs'
                    leftSection={<IconDeviceFloppy
                        style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Guardar
                </Button>
            </ModularBox>
        </Flex>
    </>;
}

export { ManagementFormUpdate };