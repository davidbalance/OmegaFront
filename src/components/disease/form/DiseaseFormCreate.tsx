import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch';
import { LoadingOverlay, Flex, rem, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef } from 'react'
import { Disease } from '@/lib/dtos/disease/response.dto';
import { DiseaseForm } from './DiseaseForm';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';

type DiseaseFormCreateProps = {
    /**
     * Identificador unico de un grupo de morbilidades
     */
    group: number;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     */
    onClose: () => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     */
    onFormSubmitted: (data: Disease) => void;
}
const DiseaseFormCreate: React.FC<DiseaseFormCreateProps> = ({ group, onClose, onFormSubmitted }) => {

    const { body, data, error, loading, reload, request, reset } = useFetch<Disease>('/api/diseases', 'POST', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<Disease, 'id'>) => {
        request({ group, ...data });
    }, [request, group]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (body) {
            reload();
        }
    }, [body, reload]);

    useEffect(() => {
        if (data) {
            onFormSubmitted(data);
            onClose();
            reset();
        }
    }, [data, onClose, reset, onFormSubmitted]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de creacion de morbilidades'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <DiseaseForm
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

export { DiseaseFormCreate }