import { UserCrendentialService } from '@/services/api';
import { CreateCredentialRQ } from '@/services/api/user-credential/dtos';
import endpoints from '@/services/endpoints/endpoints';
import { ICreateService } from '@/services/interfaces';
import { LoadingOverlay, Group, Button, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import { AuthenticationPasswordForm } from '../authentication-password';

const credentialService: ICreateService<CreateCredentialRQ, void> = new UserCrendentialService(endpoints.CREDENTIAL.V1);

type AssignCredentialProps = {
    onClose: () => void;
    email: string;
    user: number;
}
const AssignCredentialForm: React.FC<AssignCredentialProps> = ({ email, user, ...props }) => {

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
        <>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <AuthenticationPasswordForm
                onSubmit={handleSubmit}
                ref={buttonRef} />

            <Group justify="center" mt="xl">
                <Button
                    onClick={() => buttonRef.current?.click()}
                    leftSection={
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5} />}>Guardar
                </Button>
            </Group>
        </>
    )
}

export { AssignCredentialForm }