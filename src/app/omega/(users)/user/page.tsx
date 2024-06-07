'use client'

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { User } from '@/services/api/user/dtos';
import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { notifications } from '@mantine/notifications';
import { ActionIcon, Button, Tooltip, rem } from '@mantine/core';
import { IconCirclePlus, IconPlus } from '@tabler/icons-react';
import { useGet } from '@/hooks/useCrud';
import endpoints from '@/services/endpoints/endpoints';
import { useList } from '@/hooks/useList';
import { UserCreateForm } from '@/components/user/user-create-form/UserCreateForm';

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_ROLES,
}

const CreateUserButton: React.FC<{ match: boolean | undefined, onCreate: () => void }> = ({ match, onCreate }) => {
    return <>
        {
            match ?
                <Tooltip
                    label={'Crear Usuario'}
                    withArrow>
                    <ActionIcon size='sm' onClick={onCreate} variant='transparent'>
                        <IconCirclePlus style={{ width: rem(24), height: rem(24) }} />
                    </ActionIcon>
                </Tooltip> :
                <Button
                    leftSection={
                        <IconPlus style={{ width: rem(12), height: rem(12) }} />
                    }
                    onClick={onCreate}
                    radius='xl'
                    size='xs'>
                    Nuevo usuario
                </Button>
        }
    </>
}

const UserPage: React.FC = () => {

    const { data, error, isLoading } = useGet<{ users: User[] }>(endpoints.USER.V1.FIND, {
        auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH
    });
    const [users, ListHandlers] = useList<User>([]);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const match = useMediaQuery('(max-width: 700px)');

    const handleClickEventCreate = () => {
        setCurrentState(LayoutStates.CREATE);
    }

    const handleClose = () => {
        setCurrentState(LayoutStates.DEFAULT);
    }

    const handleFormSubmittionEventCreate = (user: User) => {
        ListHandlers.append(user);
    }

    const columns: ColumnOptions<User>[] = [
        { name: 'CI', key: 'dni' },
        { name: 'Nombre', key: 'name' },
        { name: 'Apellido', key: 'lastname' },
        { name: 'Correo Electronico', key: 'email' },
    ]

    useEffect(() => {
        if (error) {
            notifications.show({
                message: error.message,
                color: 'red'
            })
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            ListHandlers.override([...data.users]);
        }
    }, [data]);

    const createUserDockButton = (
        <CreateUserButton key='create-user-dock' match={match} onCreate={handleClickEventCreate} />
    );

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <UserCreateForm onClose={handleClose} matches={match} loading={isLoading} onFormSubmit={handleFormSubmittionEventCreate} />,
        [LayoutStates.UPDATE_USER]: <>{/* <UserUpdateDataForm onClose={handleClose} user={} /> */}</>,
        [LayoutStates.UPDATE_PASSWORD]: <>{/* <UserChangePassword email={''} onClose={handleClose} /> */}</>,
        [LayoutStates.UPDATE_ROLES]: <>{/* <UserRoleAssign user={0} onClose={handleClose} /> */}</>,
        [LayoutStates.DEFAULT]:
            <>
                {/* <DeleteUserDialog opened={deleteState} user={0} onClose={handleClose} /> */}
                <TableLayout<User>
                    title={'Usuarios'}
                    columns={columns}
                    data={users}
                    isLoading={isLoading}
                    action={{
                        name: 'Acciones',
                        child: <></>
                    }}
                    dock={[createUserDockButton]} />
            </>
    }

    return <>{view[currentState]}</>
}

export default UserPage