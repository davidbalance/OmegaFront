import { LoadingOverlay, rem, Box, Button, Flex, Text } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { User } from '@/services/api/user/dtos';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { Role } from '@/services/api/role/dtos';
import { FindOneACClientRS } from '@/services/api/access-control/dtos';
import { AssignRoleForm } from '@/components/role/assign-role';
import { notifications } from '@mantine/notifications';

type UserRoleAssignProps = {
    onClose: () => void;
    user: User;
}

const UserRoleAssign: React.FC<UserRoleAssignProps> = ({ user, onClose }) => {

    const roleFetchHook = useFetch<Role[]>('/api/roles', 'GET');
    const getAccessControlHook = useFetch<FindOneACClientRS>(`/api/access-control/${user.id}`, 'GET');
    const patchAccessControlHook = useFetch<any>(`/api/access-control/${user.id}`, 'PATCH', { loadOnMount: false });

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async ({ roles }: { roles: number[] }) => {
        patchAccessControlHook.request({ roles });
        setTimeout(() => setShouldSendRequest(true), 500);
    }

    useEffect(() => {
        if (getAccessControlHook.error) {
            notifications.show({ message: getAccessControlHook.error.message, color: 'red' });
        } else if (roleFetchHook.error) {
            notifications.show({ message: roleFetchHook.error.message, color: 'red' });
        } else if (patchAccessControlHook.error) {
            notifications.show({ message: patchAccessControlHook.error.message, color: 'red' });
        }
    }, [getAccessControlHook.error, roleFetchHook.error, patchAccessControlHook.error]);

    useEffect(() => {
        if (shouldSendRequest) {
            patchAccessControlHook.reload();
        }
    }, [shouldSendRequest]);


    useEffect(() => {
        if (patchAccessControlHook.data) {
            onClose();
        }
    }, [patchAccessControlHook.data]);

    return (
        <>
            <LoadingOverlay visible={getAccessControlHook.loading || roleFetchHook.loading || patchAccessControlHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <SubLayoutFormTitle
                    title={'Formulario de asignacion de roles'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        {
                            getAccessControlHook.data
                                ? <AssignRoleForm
                                    ref={buttonRef}
                                    onSubmit={handleSubmit}
                                    roles={roleFetchHook.data || []}
                                    data={{ roles: getAccessControlHook.data.roles.map(e => e.id) }} />
                                : <Text>No se han encontrado roles</Text>
                        }
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

export { UserRoleAssign }