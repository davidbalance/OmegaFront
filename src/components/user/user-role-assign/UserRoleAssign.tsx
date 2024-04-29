import { LoadingOverlay, Group, rem, ActionIcon, Box, Text, Button } from '@mantine/core';
import { useAccessControl } from '@/hooks/useAccessControl';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react'
import { useRole } from '@/hooks/useRole';
import { AssignRoleForm } from '@/components/role/assign-role';

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
            <Group w='100%' justify='flex-end' mb={rem(12)}>
                <ActionIcon variant='transparent' onClick={onClose}>
                    <IconX />
                </ActionIcon>
            </Group>

            <Group justify='center'>
                <Box miw={rem(800)} pt={rem(32)} px='lg'>
                    <Box mb={rem(12)}>
                        <Text
                            tt="uppercase"
                            fw={500}
                            component='span'
                            variant='text'
                            c="omegaColors"
                            size='md'>
                            Formulario de asignacion de roles
                        </Text>
                    </Box>

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