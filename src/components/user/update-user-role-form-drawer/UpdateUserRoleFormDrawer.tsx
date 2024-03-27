import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core';
import React, { useRef } from 'react'
import UserRoleForm, { Role } from '../user-role-form/UserRoleForm';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { UserModel, UserViewService } from '@/services';

type UpdateUserRoleFormDrawerProps = {
    user: number;
    roles: Role[];
    onComplete: (roles: any[]) => void;
} & DrawerProps
const UpdateUserRoleFormDrawer: React.FC<UpdateUserRoleFormDrawerProps> = ({ user, roles, onComplete, ...props }) => {

    const userViewService: UserViewService = new UserViewService();

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (roles: any) => {
        await userViewService.findOneAndUpdateRoles(user, roles);
        onComplete(roles);
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