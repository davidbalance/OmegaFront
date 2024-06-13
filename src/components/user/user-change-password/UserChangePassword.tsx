import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { useCredential } from '@/hooks/useCredential';
import { useFetch } from '@/hooks/useFetch/useFetch';
import endpoints from '@/lib/endpoints/endpoints';
import { Box, Button, Flex, Group, LoadingOverlay, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react'

type UserChangePasswordProps = {
    email: string;
    onClose: () => void;
}
const UserChangePassword: React.FC<UserChangePasswordProps> = ({ email, onClose }) => {

    const { data, error, loading, request, reload } = useFetch('/api/credential', 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleSubmit = async (password: string) => {
        request({ email, password });
        setTimeout(() => {
            setShouldSendRequest(true);
        }, 500);
    }

    useEffect(() => {
        if (shouldSendRequest) {
            reload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest]);

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error])


    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data])

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <SubLayoutFormTitle
                    title={'Formulario de modificacion de contraseña'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box maw={700} w='100%' pt={rem(16)} >
                        <AuthenticationPasswordForm
                            onSubmit={({ password }) => handleSubmit(password)}
                            ref={buttonRef} />
                    </Box>
                </ModularBox>
                <ModularBox direction='row'>
                    <Button flex={1} size='xs' onClick={() => buttonRef.current?.click()} leftSection={
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar
                    </Button>
                </ModularBox>
            </Flex>
        </>
    )
}

export { UserChangePassword }