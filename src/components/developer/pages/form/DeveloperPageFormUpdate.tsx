import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DeveloperPageForm } from './DeveloperPageForm'
import { PATCHWebResourceResponseDto, WebFullResource } from '@/lib/dtos/web/resources.response.dto';
import { POSTWebFullResourceRequestDto } from '@/lib/dtos/web/resources.request.dto';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { useFetch } from '@/hooks/useFetch';
import { LoadingOverlay, Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';

type DeveloperPageFormUpdateProps = {
    /**
     * Es el recurso web que debera ser modificado.
     */
    resource: WebFullResource;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     */
    onClose: () => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     */
    onFormSubmit?: (data: WebFullResource) => void;
}
const DeveloperPageFormUpdate: React.FC<DeveloperPageFormUpdateProps> = ({ resource, onClose, onFormSubmit }) => {

    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const {
        body: fetchBody,
        data: fetchData,
        error: fetchError,
        loading: fetchLoading,
        reload: fetchReload,
        request: fetchRequest,
        reset: fetchReset
    } = useFetch<PATCHWebResourceResponseDto>(`/api/web/resources/${resource ? resource.id : ''}`, 'PATCH', { loadOnMount: false });

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
    }, [shouldFetch, fetchBody, fetchReload]);

    return (
        <>
            <LoadingOverlay visible={fetchLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <ModularLayout>
                <LayoutSubFormTitle
                    title={'Formulario de actualizacion de pagina'}
                    onClose={handleClose}
                />
                <ModularBox flex={1}>
                    <DeveloperPageForm
                        data={resource}
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
    );
}

export { DeveloperPageFormUpdate }