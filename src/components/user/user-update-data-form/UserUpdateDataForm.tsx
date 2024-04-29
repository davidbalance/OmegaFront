import { User } from '@/services/api/user/dtos';
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { useUser } from '@/hooks';

type UserUpdateDataFormProps = {
    onClose: () => void;
    user: User
}

const UserUpdateDataForm: React.FC<UserUpdateDataFormProps> = ({ onClose, user }) => {

    const userHook = useUser();

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        const updatedData = { ...user, ...data };
        delete updatedData.id;
        try {
            await userHook.update({ id: user.id, ...updatedData });
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={userHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                            Formulario de modificacion de usuario
                        </Text>
                    </Box>

                    <UserDataForm
                        onSubmit={handleSubmit}
                        data={user}
                        disabledDni={true}
                        disabledEmail={true}
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

export { UserUpdateDataForm }