import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { useCredential } from '@/hooks/useCredential'
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'

type DoctorCreateCredentialProps = {
    user: { id: number, email: string };
    onClose: () => void;
}

const DoctorCreateCredential: React.FC<DoctorCreateCredentialProps> = ({ user, onClose }) => {

    const credentialHook = useCredential();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (password: string) => {
        try {
            credentialHook.create({ user: user.id, password: password, ...user });
            notifications.show({
                message: `Credenciales creadas para ${user.email}`,
                color: 'green'
            })
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={credentialHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <SubLayoutFormTitle
                title={'Formulario de asignacion de credenciales'}
                onClose={onClose} />

            <Group justify='center'>
                <Box pt={rem(32)} px='lg'>
                    <Group justify='center'>
                        <Text
                            fw={500}
                            ta="center"
                            component='span'
                            variant='text'
                            size='sm'>{user.email}</Text>
                    </Group>

                    <AuthenticationPasswordForm
                        onSubmit={({ password }) => handleSubmit(password)}
                        ref={buttonRef} />

                    <Group justify="center" mt="xl">
                        <Button
                            onClick={() => buttonRef.current?.click()}
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5} />}>
                            Guardar
                        </Button>
                    </Group>

                </Box>
            </Group>
        </>
    )
}

export default DoctorCreateCredential