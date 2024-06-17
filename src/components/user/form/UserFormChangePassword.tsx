import { AuthenticationFormPassword } from '@/components/authentication/form/AuthenticationFormPassword';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { Box, Button, Flex, LoadingOverlay, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'

type UserFormChangePasswordProps = {
    email: string;
    onClose: () => void;
}
const UserFormChangePassword: React.FC<UserFormChangePasswordProps> = ({ email, onClose }) => {

    const { data, error, loading, body, request, reload, reset } = useFetch('/api/credentials', 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleSubmit = useCallback(async (password: string) => {
        request({ email, password });
        setShouldSendRequest(true);
    }, [request]);

    useEffect(() => {
        if (shouldSendRequest && body) {
            reload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, body, reload]);

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error])


    useEffect(() => {
        if (data) {
            onClose();
            reset();
        }
    }, [data, reset])

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={'Formulario de modificacion de contraseña'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box maw={700} w='100%' pt={rem(16)} >
                        <AuthenticationFormPassword
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

export { UserFormChangePassword }