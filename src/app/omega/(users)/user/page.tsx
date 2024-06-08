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
import { useFetch } from '@/hooks/useFetch/useFetch';
import { UserActionColumn } from '@/components/user/user-action-column/UserActionColumn';

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

    const { data, error, loading } = useFetch<User[]>('/api/users', 'GET');
    const [users, ListHandlers] = useList<User>([]);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [selected, setSelected] = useState<User | null>(null);

    const match = useMediaQuery('(max-width: 700px)');

    const handleClickEventCreate = () => {
        setCurrentState(LayoutStates.CREATE);
    }

    const handleClickEventUpdateUser = (user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_USER);
    }

    const handleClickEventUpdatePassword = (user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_PASSWORD);
    }

    const handleClickEventUpdateRole = (user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_ROLES);
    }

    const handleClickEventClose = () => {
        setSelected(null);
        setCurrentState(LayoutStates.DEFAULT);
    }

    const handleFormSubmittionEventCreate = (user: User) => {
        console.log(user);
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
        if (data) { ListHandlers.override([...data]); }
    }, [data]);

    const createUserDockButton = (
        <CreateUserButton key='create-user-dock' match={match} onCreate={handleClickEventCreate} />
    );

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <UserCreateForm onClose={handleClickEventClose} matches={match} onFormSubmit={handleFormSubmittionEventCreate} />,
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
                    isLoading={loading}
                    action={{
                        name: 'Acciones',
                        child: (props) => <UserActionColumn
                            onChangePassword={() => { }}
                            onDelete={() => { }}
                            onConfiguration={() => { }}
                            onModification={() => { }}
                            {...props} />
                    }}
                    dock={[createUserDockButton]} />
            </>
    }

    return <>{view[currentState]}</>
}

export default UserPage