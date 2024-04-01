import { Button, Drawer, DrawerProps, Group, LoadingOverlay, Text, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useRef } from 'react'
import UserPasswordForm from '../user-password-form/UserPasswordForm';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { CreateCredentialRQ, ICreateService, UserCrendentialService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';

const credentialService: ICreateService<CreateCredentialRQ, void> = new UserCrendentialService(endpoints.CREDENTIAL.V1);

type AssignCredentialDrawerProps = DrawerProps & {
    email: string;
    user: number;
}
const AssignCredentialDrawer: React.FC<AssignCredentialDrawerProps> = ({ email, user, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        LoadDisclosure.open();
        try {
            await credentialService.create({ email, user, ...data });
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al asignar las credenciales',
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
            title="Formulario de asignacion de credenciales"
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

export default AssignCredentialDrawer