import { LoadingOverlay, rem, Box, Button, Flex } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { UserForm } from './UserForm';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { User } from '@/lib/dtos/user/user/base.response.dto';

type UserFormUpdateProps = {
    /**
     * Objeto que inicializa el formulario de actualizacion del usuario
     */
    user: User;
    /**
     * Funcion que es invocada cuando llama al evento de cierre del formulario.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es invocada cuando se envia el formulario.
     * @param user 
     * @returns 
     */
    onFormSubmittion?: (user: User) => void;
}

const UserFormUpdate: React.FC<UserFormUpdateProps> = ({ onClose, user, onFormSubmittion }) => {

    const { data, error, loading, body, request, reload, reset } = useFetch<User>(`/api/users/${user.id}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleFormSubmittionEvent = useCallback(async (data: any) => {
        request(data);
        setShouldSendRequest(true);
    }, [request])

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error]);

    useEffect(() => {
        if (shouldSendRequest && body) {
            reload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, body, reload]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(data);
            onClose();
            reset();
        }
    }, [data, onFormSubmittion, onClose, reset
    ])


    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={'Formulario de modificacion de usuario'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <UserForm
                            onSubmit={handleFormSubmittionEvent}
                            data={user}
                            disabledDni={true}
                            disabledEmail={true}
                            ref={buttonRef} />
                    </Box>
                </ModularBox>

                <ModularBox direction='row'>
                    <Button flex={1} size='xs' onClick={() => buttonRef.current?.click()} leftSection={
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar
                    </Button>
                </ModularBox>

            </Flex>
        </>
    )
}

export { UserFormUpdate }