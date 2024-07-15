import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch';
import { LoadingOverlay, Flex, rem, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { Area } from '@/lib/dtos/location/area/response.dto';
import { AreaForm } from './AreaForm';

type AreaFormCreateProps = {
    /**
     * Identificador unico de un grupo de morbilidades
     */
    management: number;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     */
    onClose: () => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     */
    onFormSubmitted: (data: Area) => void;
}
const AreaFormCreate: React.FC<AreaFormCreateProps> = ({ management, onClose, onFormSubmitted }) => {

    const {
        body: areaBody,
        data: areaData,
        error: areaError,
        loading: areaLoading,
        reload: areaReload,
        request: areaRequest,
        reset: areaReset,
    } = useFetch<Area>('/api/area', 'POST', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [shouldSendRequest, setShouldSendRequest] = useState(false);

    const handleFormSubmittedEvent = useCallback((data: Omit<Area, 'id'>) => {
        areaRequest({ management, ...data });
        setShouldSendRequest(true);
    }, [areaRequest, management]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (areaBody && shouldSendRequest) {
            areaReload();
            setShouldSendRequest(false);
        }
    }, [areaBody, shouldSendRequest, areaReload]);

    useEffect(() => {
        if (areaData) {
            onFormSubmitted(areaData);
            onClose();
            areaReset();
        }
    }, [areaData, onClose, areaReset, onFormSubmitted]);

    useEffect(() => {
        if (areaError) notifications.show({ message: areaError.message, color: 'red' });
    }, [areaError]);

    return <>
        <LoadingOverlay visible={areaLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de creacion de area'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <AreaForm
                    ref={buttonRef}
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

export { AreaFormCreate }