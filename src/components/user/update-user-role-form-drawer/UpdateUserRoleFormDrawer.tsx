import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core';
import React, { useRef } from 'react'
import UserRoleForm, { Role as RoleType } from '../user-role-form/UserRoleForm';
import { IconDeviceFloppy } from '@tabler/icons-react';
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { AccessControlService } from '@/services/api';

const accessControlService = new AccessControlService(endpoints.ACCESS_CONTROL.V1);

type UpdateUserRoleFormDrawerProps = DrawerProps & {
    user: number;
    roles: RoleType[]
}
const UpdateUserRoleFormDrawer: React.FC<UpdateUserRoleFormDrawerProps> = ({ user, roles, ...props }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (roles: any) => {
        try {
            const newData = { user, ...roles };
            await accessControlService.findOneAndUpdateRoles(newData);
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Al actualizar los roles han ocurrio un error',
                color: 'red'
            });
        }
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de asignacion de roles"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <UserRoleForm
                ref={buttonRef}
                onSubmit={handleSubmit}
                roles={roles} />

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

export default UpdateUserRoleFormDrawer