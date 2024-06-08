import { User } from '@/services/api/user/dtos';
import { LoadingOverlay, Group, rem, Box, Button, Flex, Container } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { notifications } from '@mantine/notifications';
import { ModularBox } from '@/components/modular-box/ModularBox';

type UserUpdateDataFormProps = {
    user: User;
    onFormSubmittion?: (user: User) => void;
    onClose: () => void;
}

const UserUpdateDataForm: React.FC<UserUpdateDataFormProps> = ({ onClose, user, onFormSubmittion }) => {

    const { data, error, loading, request, reload } = useFetch<User>(`/api/users/${user.id}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleSubmit = async (data: any) => {
        request(data);
        setTimeout(() => {
            setShouldSendRequest(true);
        }, 500);
    }

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error]);

    useEffect(() => {
        if (shouldSendRequest) {
            reload();
        }
    }, [shouldSendRequest]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(data);
            onClose();
        }
    }, [data])


    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <SubLayoutFormTitle
                    title={'Formulario de modificacion de usuario'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <UserDataForm
                            onSubmit={handleSubmit}
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

export { UserUpdateDataForm }