import { AuthenticationFormPassword } from '@/components/authentication/form/AuthenticationFormPassword';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { POSTCredentialRequestDto } from '@/lib/dtos/auth/credential/request.dto';
import { LoadingOverlay, Group, rem, Box, Button, Text, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'

type DoctorFormCreateCredentialProps = {
    doctor: { id: number, email: string };
    onClose: () => void;
    onFormSubmittion?: (id: number) => void;
}

const DoctorFormCreateCredential: React.FC<DoctorFormCreateCredentialProps> = ({ doctor, onClose, onFormSubmittion }) => {

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
        request<POSTCredentialRequestDto>({ email: doctor.email, password: password, user: doctor.id });
        setShouldFetch(true);
    }, [request, doctor]);

    useEffect(() => {
        if (shouldFetch && body) {
            reload();
            setShouldFetch(false);
        }
    }, [shouldFetch, body]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(doctor.id);
            onClose();
            reset();
        }
    }, [onClose, onFormSubmittion, reset, data]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={`Formulario de asignacion de credenciales: ${doctor.email}`}
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