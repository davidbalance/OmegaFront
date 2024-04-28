import { Group, Button, rem, LoadingOverlay, ActionIcon, Text, Box } from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { UserService } from '@/services/api';
import { UpdateUserRQ, User as UserType } from '@/services/api/user/dtos';
import { IUpdateService } from '@/services/interfaces';
import { useUser } from '@/hooks/useUser';

const userService: IUpdateService<UpdateUserRQ, UserType> = new UserService(endpoints.USER.V1);

type UpdateUserFormProps = {
    onClose: () => void;
    user: Omit<UserType, 'roles'>;
}
const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        const updatedData = { ...user, ...data };
        delete updatedData.id;
        LoadDisclosure.open();
        try {
            await useUser().update({ id: user.id, ...updatedData });
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Al actualizar el usuario ha ocurrio un error',
                color: 'red'
            });
        } finally {
            LoadDisclosure.close();
        }
    }

    return (
        <>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group w='100%' justify='flex-end' mb={rem(6)}>
                <ActionIcon variant='transparent' onClick={props.onClose}>
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

export { UpdateUserForm }