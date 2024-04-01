import { Button, Drawer, DrawerProps, Group, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useRef } from 'react'
import UserPasswordForm from '../user-password-form/UserPasswordForm'
import { notifications } from '@mantine/notifications'
import { FindCredentialAndUpdateRQ, IUpdateService, UserCrendentialService } from '@/services'
import endpoints from '@/services/endpoints/endpoints'
import { useDisclosure } from '@mantine/hooks'

const credentialService: IUpdateService<FindCredentialAndUpdateRQ, void> = new UserCrendentialService(endpoints.CREDENTIAL.V1);

type ChangePasswordDrawerProps = DrawerProps & {
    email: string;
}
const ChangePasswordDrawer: React.FC<ChangePasswordDrawerProps> = ({ email, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        LoadDisclosure.open();
        try {
            await credentialService.findOneAndUpdate({ email, ...data });
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Al actualizar la contraseña han ocurrio un error',
                color: 'red'
            });
        } finally {
            LoadDisclosure.close();
        }
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de cambio de contraseña"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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