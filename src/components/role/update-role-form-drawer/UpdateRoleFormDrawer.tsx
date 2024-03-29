import { RoleModel } from '@/services';
import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core';
import React, { useRef } from 'react'
import { RoleFormProps } from '../role-form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import RoleForm from '../role-form/RoleForm';

type UpdateRoleFormDrawerProps = DrawerProps & Omit<RoleFormProps, 'onSubmit'> & {
    onComplete: (data: RoleModel) => void;
}
const UpdateRoleFormDrawer: React.FC<UpdateRoleFormDrawerProps> = ({ permssions, data, onComplete, ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        onComplete(data);
    }

    return (
        <Drawer
            position='right'
            title="Formulario de roles"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'
            {...props}>

            <RoleForm
                data={data}
                onSubmit={handleSubmit}
                ref={buttonRef}
                permssions={permssions} />

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

export default UpdateRoleFormDrawer