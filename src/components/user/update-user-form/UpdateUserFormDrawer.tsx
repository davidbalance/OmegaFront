import { Drawer, Group, Button, rem } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';

type UpdateUserFormDrawerProps = { opened: boolean; close: () => void; user: any }
const UpdateUserFormDrawer: React.FC<UpdateUserFormDrawerProps> = ({ close, opened, user }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position='right'
            title="Formulario de usuario"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

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