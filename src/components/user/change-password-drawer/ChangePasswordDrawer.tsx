import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useRef } from 'react'
import UserPasswordForm from '../user-password-form/UserPasswordForm'

type ChangePasswordDrawerProps = DrawerProps
const ChangePasswordDrawer: React.FC<ChangePasswordDrawerProps> = ({ ...props }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de cambio de contraseña"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <UserPasswordForm
                onSubmit={handleSubmit}
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

export default ChangePasswordDrawer