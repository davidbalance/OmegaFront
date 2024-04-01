import { Drawer, Group, Button, rem, DrawerProps, LoadingOverlay } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { User } from '@/lib';
import { FindUserAndUpdateRQ, IUpdateService, UserService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

const userService: IUpdateService<FindUserAndUpdateRQ, void> = new UserService(endpoints.USER.V1);

type UpdateUserFormDrawerProps = DrawerProps & {
    user: Omit<User, 'roles'>;
}
const UpdateUserFormDrawer: React.FC<UpdateUserFormDrawerProps> = ({ user, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        const updatedData = { ...user, ...data };
        delete updatedData.id;
        LoadDisclosure.open();
        try {
            await userService.findOneAndUpdate({ id: user.id, ...updatedData });
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
        <Drawer
            position='right'
            title="Formulario de usuario"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'
            {...props}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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
        </Drawer>
    )
}

export default UpdateUserFormDrawer