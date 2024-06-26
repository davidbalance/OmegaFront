import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DeveloperPageForm } from './DeveloperPageForm'
import { POSTWebResourceResponseDto, WebFullResource } from '@/lib/dtos/web/resources.response.dto';
import { POSTWebFullResourceRequestDto } from '@/lib/dtos/web/resources.request.dto';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Button, LoadingOverlay, rem } from '@mantine/core';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';

type DeveloperPageFormCreateProps = {
    onClose: () => void;
    onFormSubmit?: (data: WebFullResource) => void;
}
const DeveloperPageFormCreate: React.FC<DeveloperPageFormCreateProps> = ({ onClose, onFormSubmit }) => {

    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const {
        body: fetchBody,
        data: fetchData,
        error: fetchError,
        loading: fetchLoading,
        reload: fetchReload,
        request: fetchRequest,
        reset: fetchReset
    } = useFetch<POSTWebResourceResponseDto>('/api/web/resources', 'POST', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClickEvent = useCallback(() => {
        buttonRef.current?.click();
    }, [])

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleFormSubmittionEvent = useCallback((data: POSTWebFullResourceRequestDto) => {
        fetchRequest(data);
        setShouldFetch(true);
    }, [fetchRequest]);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (fetchData) {
            onFormSubmit?.(fetchData);
            onClose();
            fetchReset();
        }
    }, [fetchData, onFormSubmit, onClose, fetchReset]);

    useEffect(() => {
        if (fetchBody && shouldFetch) {
            fetchReload();
            setShouldFetch(false);
        }
    }, [shouldFetch, fetchBody, fetchReload])

    return (
        <>
            <LoadingOverlay visible={fetchLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <ModularLayout>
                <LayoutSubFormTitle
                    title={'Formulario de creacion de paginas'}
                    onClose={handleClose}
                />
                <ModularBox flex={1}>
                    <DeveloperPageForm
                        onFormSubmittion={handleFormSubmittionEvent}
                        ref={buttonRef} />
                </ModularBox>

                <ModularBox direction='row'>
                    <Button
                        flex={1}
                        size='xs'
                        onClick={handleClickEvent}
                        leftSection={
                            <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        }>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </>
    )
}

export { DeveloperPageFormCreate }