import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { useCredential } from '@/hooks/useCredential'
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
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
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={credentialHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group w='100%' justify='flex-end' mb={rem(6)}>
                <ActionIcon variant='transparent' onClick={onClose}>
                    <IconX />
                </ActionIcon>
            </Group>
            <Group justify='center'>
                <Box miw={rem(800)} pt={rem(32)} px='lg'>
                    <Box mb={rem(12)}>
                        <Text
                            tt="uppercase"
                            fw={500}
                            component='span'
                            variant='text'
                            c="omegaColors"
                            size='md'>
                            Formulario de asignacion de credenciales
                        </Text>
                    </Box>
                    <Group justify='center'>
                        <Text
                            fw={600}
                            ta="center"
                            component='span'
                            variant='text'
                            size='md'>{user.email}</Text>
                    </Group>

                    <AuthenticationPasswordForm
                        onSubmit={({ password }) => handleSubmit(password)}
                        ref={buttonRef} />

                    <Group justify="center" mt="xl">
                        <Button
                            onClick={() => buttonRef.current?.click()}
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(18), height: rem(18) }}
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