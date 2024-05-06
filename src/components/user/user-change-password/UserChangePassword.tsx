import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { useCredential } from '@/hooks/useCredential';
import { ActionIcon, Box, Button, Group, LoadingOverlay, rem, Text, Title } from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import React, { useRef } from 'react'

type UserChangePasswordProps = {
    email: string;
    onClose: () => void;
}
const UserChangePassword: React.FC<UserChangePasswordProps> = ({ email, onClose }) => {

    const credentialHook = useCredential();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (password: string) => {
        try {
            await credentialHook.update({ email, password });
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={credentialHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <SubLayoutFormTitle
                title={'Formulario de modificacion de contraseña'}
                onClose={onClose} />

            <Group justify='center'>
                <Box pt={rem(32)} px='lg'>
                    <AuthenticationPasswordForm
                        onSubmit={({ password }) => handleSubmit(password)}
                        ref={buttonRef} />
                    <Group justify="center" mt="xl">
                        <Button
                            onClick={() => buttonRef.current?.click()}
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5} />}>Guardar
                        </Button>
                    </Group>

                </Box>
            </Group>
        </>
    )
}

export { UserChangePassword }