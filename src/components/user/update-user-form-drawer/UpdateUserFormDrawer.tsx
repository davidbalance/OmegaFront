import { Drawer, Group, Button, rem, DrawerProps } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { ICrudService, UserModel, UserViewService } from '@/services';

type UpdateUserFormDrawerProps = DrawerProps & {
    user: Omit<UserModel, 'roles'>;
    onComplete: (value: UserModel) => void;
}
const UpdateUserFormDrawer: React.FC<UpdateUserFormDrawerProps> = ({ user, onComplete, ...props }) => {

    const userViewService: ICrudService<UserModel, number> = new UserViewService();

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        const updatedData = { ...user, ...data };
        userViewService.findOneAndUpdate(user.id, updatedData);
        onComplete(updatedData);
    }

    return (
        <Drawer
            position='right'
            title="Formulario de usuario"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'
            {...props}>

            <UserDataForm
                onSubmit={handleSubmit}
                data={user}
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