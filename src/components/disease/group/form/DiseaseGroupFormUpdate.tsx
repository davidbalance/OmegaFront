import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { LoadingOverlay, rem, Button, Flex } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef } from 'react'
import DiseaseGroupForm from './DiseaseGroupForm';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { notifications } from '@mantine/notifications';
import { DiseaseGroup } from '@/lib/dtos/disease/group/response.dto';

type DiseaseGroupFormUpdateProps = {
    diseaseGroup: DiseaseGroup;
    onFormSubmitted: (value: DiseaseGroup) => void;
    onClose: () => void;
}
const DiseaseGroupFormUpdate: React.FC<DiseaseGroupFormUpdateProps> = ({ onClose, onFormSubmitted, diseaseGroup }) => {
    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>(`/api/diseases/groups/${diseaseGroup ? diseaseGroup.id : ''}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<DiseaseGroup, 'id' | 'diseases'>) => {
        request({ ...diseaseGroup, ...data });
    }, [request]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, [buttonRef.current]);

    useEffect(() => {
        if (body) {
            reload();
        }
    }, [body]);

    useEffect(() => {
        if (data && body) {
            onFormSubmitted({ ...diseaseGroup, ...body });
            onClose();
            reset();
        }
    }, [data, body, reset, onFormSubmitted]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <SubLayoutFormTitle
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