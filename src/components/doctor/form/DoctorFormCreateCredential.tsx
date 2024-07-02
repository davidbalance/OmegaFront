import { AuthenticationFormPassword } from '@/components/authentication/form/AuthenticationFormPassword';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch';
import { POSTCredentialRequestDto } from '@/lib/dtos/auth/credential/request.dto';
import { LoadingOverlay, rem, Box, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'

type DoctorFormCreateCredentialProps = {
    /**
     * Datos del usuario usados como base para a asignacion de credenciales.
     */
    user: { id: number, email: string };
    /**
     * Funcion que es invocada cuando se llama al evento de cierre.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es invocada cuando se envia el formulario.
     * @param id 
     * @returns 
     */
    onFormSubmittion?: (id: number) => void;
}

const DoctorFormCreateCredential: React.FC<DoctorFormCreateCredentialProps> = ({ user, onClose, onFormSubmittion }) => {

    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const {
        data,
        body,
        error,
        loading,
        reload,
        request,
        reset
    } = useFetch<any>('/api/credentials', 'POST', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittion = useCallback((password: string) => {
        request<POSTCredentialRequestDto>({ email: user.email, password: password, user: user.id });
        setShouldFetch(true);
    }, [request, user]);

    useEffect(() => {
        if (shouldFetch && body) {
            reload();
            setShouldFetch(false);
        }
    }, [shouldFetch, body, reload]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(user.id);
            onClose();
            reset();
        }
    }, [onClose, onFormSubmittion, reset, data, user]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={`Formulario de asignacion de credenciales: ${user.email}`}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <AuthenticationFormPassword
                            onSubmit={({ password }) => handleFormSubmittion(password)}
                            ref={buttonRef} />
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
                                stroke={1.5} />}>
                        Guardar
                    </Button>
                </ModularBox>
            </Flex>
        </>
    )
}

export { DoctorFormCreateCredential }