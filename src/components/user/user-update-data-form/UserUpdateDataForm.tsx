import { User } from '@/services/api/user/dtos';
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text, Title, SimpleGrid, Grid } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { useUser } from '@/hooks';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

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

            <SubLayoutFormTitle
                title={'Formulario de modificacion de usuario'}
                onClose={onClose} />

            <Group justify='center'>
                <Box pt={rem(32)} px='lg'>

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