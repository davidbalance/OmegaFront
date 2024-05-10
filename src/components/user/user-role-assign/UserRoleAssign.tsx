import { LoadingOverlay, Group, rem, ActionIcon, Box, Text, Button, Title } from '@mantine/core';
import { useAccessControl } from '@/hooks/useAccessControl';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react'
import { useRole } from '@/hooks/useRole';
import { AssignRoleForm } from '@/components/role/assign-role';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

type UserRoleAssignProps = {
    onClose: () => void;
    user: number;
}

const UserRoleAssign: React.FC<UserRoleAssignProps> = ({ user, onClose }) => {

    const roleHook = useRole(true);
    const accessControlHook = useAccessControl();

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        accessControlHook.findOne(user);
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    const handleSubmit = async ({ roles }: { roles: number[] }) => {
        try {
            await accessControlHook.updateRoles({ user, roles });
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={accessControlHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <SubLayoutFormTitle
                title={'Formulario de asignacion de roles'}
                onClose={onClose} />

            <Group justify='center'>
                <Box pt={rem(32)} px='lg'>

                    {
                        accessControlHook.client ? <AssignRoleForm
                            ref={buttonRef}
                            onSubmit={handleSubmit}
                            roles={roleHook.roles}
                            data={{ roles: accessControlHook.client.roles.map(e => e.id) }} />
                            : <Text>No se tienen roles asignados</Text>
                    }

                    <Group justify="center" mt="xl">
                        <Button
                            onClick={() => buttonRef.current?.click()}
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5} />}>Guardar
                        </Button>
                    </Group>
                </Box>
            </Group>
        </>
    )
}

export default UserRoleAssign