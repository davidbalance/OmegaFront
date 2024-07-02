import { LoadingOverlay, rem, Button, Flex } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef } from 'react'
import DiseaseGroupForm from './DiseaseGroupForm';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import { DiseaseGroup } from '@/lib/dtos/disease/group/response.dto';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';

type DiseaseGroupFormUpdateProps = {
    /**
     * Grupo de morbilidad para inicializar el formulario.
     */
    diseaseGroup: DiseaseGroup;
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
    onFormSubmitted: (value: DiseaseGroup) => void;
}
const DiseaseGroupFormUpdate: React.FC<DiseaseGroupFormUpdateProps> = ({ onClose, onFormSubmitted, diseaseGroup }) => {
    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>(`/api/diseases/groups/${diseaseGroup ? diseaseGroup.id : ''}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<DiseaseGroup, 'id' | 'diseases'>) => {
        request({ ...diseaseGroup, ...data });
    }, [request, diseaseGroup]);

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
        if (data && body) {
            onFormSubmitted({ ...diseaseGroup, ...body });
            onClose();
            reset();
        }
    }, [data, diseaseGroup, body, reset, onFormSubmitted, onClose]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de creacion de groupos de morbilidades'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <DiseaseGroupForm
                    ref={buttonRef}
                    formData={diseaseGroup}
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

export { DiseaseGroupFormUpdate };