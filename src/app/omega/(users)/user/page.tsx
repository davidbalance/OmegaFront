'use client'

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { User } from '@/services/api/user/dtos';
import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { notifications } from '@mantine/notifications';
import { LoadingOverlay } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useList } from '@/hooks/useList';
import { UserCreateForm } from '@/components/user/user-create-form/UserCreateForm';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { UserActionColumn } from '@/components/user/user-action-column/UserActionColumn';
import { UserUpdateDataForm } from '@/components/user/user-update-data-form/UserUpdateDataForm';
import { UserChangePassword } from '@/components/user/user-change-password/UserChangePassword';
import { UserRoleAssign } from '@/components/user/user-role-assign/UserRoleAssign';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { ResponsiveButton } from '@/components/buttons/responsive-button/ResponsiveButton';

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_ROLES,
}

const UserPage: React.FC = () => {

    const { data, error, loading } = useFetch<User[]>('/api/users', 'GET');
    const [users, ListHandlers] = useList<User>([]);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [selected, setSelected] = useState<User | null>(null);

    const deleteUserFetchHook = useFetch<any>(`/api/users/${selected?.id!}`, 'DELETE', { loadOnMount: false });

    const deleteConfirmation = useConfirmation();
    const match = useMediaQuery('(max-width: 700px)');
    const [shouldDeleteUser, setShouldDeleteUser] = useState<boolean>(false);

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

    const handleClickEventDeleteUser = async (user: User) => {
        setSelected(user);
        const confirmed = await deleteConfirmation.show("Eliminacion del usuario", `El usuario ${user.name} ${user.lastname} sera eliminado. ¿Está de acuerdo?`);
        if (confirmed) {
            setShouldDeleteUser(true);
        } else {
            setSelected(null);
        }
    }

    const handleClickEventClose = () => {
        setSelected(null);
        setCurrentState(LayoutStates.DEFAULT);
    }

    const handleFormSubmittionEventCreate = (user: User) => {
        ListHandlers.append(user);
    }

    const handleFormSubmittionEventUpdateUser = (user: User) => {
        ListHandlers.update('id', user.id!, user);
    }

    const columns: ColumnOptions<User>[] = [
        { name: 'CI', key: 'dni' },
        { name: 'Nombre', key: 'name' },
        { name: 'Apellido', key: 'lastname' },
        { name: 'Correo Electronico', key: 'email' },
    ]

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        } else if (deleteUserFetchHook.error) {
            notifications.show({ message: deleteUserFetchHook.error.message, color: 'red' });
        }
    }, [error, deleteUserFetchHook.error]);

    useEffect(() => {
        if (data) { ListHandlers.override([...data]); }
    }, [data]);

    useEffect(() => {
        if (selected && shouldDeleteUser) {
            deleteUserFetchHook.reload();
            setShouldDeleteUser(false);
        }
    }, [selected, shouldDeleteUser]);

    useEffect(() => {
        if (deleteUserFetchHook.data) {
            ListHandlers.remove('id', selected?.id!);
            setSelected(null);
        }
    }, [deleteUserFetchHook.data]);

    const createUserDockButton = (
        <ResponsiveButton key='create-user-dock' onClick={handleClickEventCreate} label={'Nuevo usuario'} icon={<IconPlus />} />
    );

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <UserCreateForm onClose={handleClickEventClose} matches={match} onFormSubmit={handleFormSubmittionEventCreate} />,
        [LayoutStates.UPDATE_USER]: <UserUpdateDataForm onClose={handleClickEventClose} user={selected!} onFormSubmittion={handleFormSubmittionEventUpdateUser} />,
        [LayoutStates.UPDATE_PASSWORD]: <UserChangePassword onClose={handleClickEventClose} email={selected?.email!} />,
        [LayoutStates.UPDATE_ROLES]: <UserRoleAssign user={selected!} onClose={handleClickEventClose} />,
        [LayoutStates.DEFAULT]:
            <TableLayout<User>
                title={'Usuarios'}
                columns={columns}
                data={users}
                isLoading={loading}
                action={{
                    name: 'Acciones',
                    child: (props) => <UserActionColumn
                        onModification={() => handleClickEventUpdateUser(props.value)}
                        onChangePassword={() => handleClickEventUpdatePassword(props.value)}
                        onConfiguration={() => handleClickEventUpdateRole(props.value)}
                        onDelete={() => handleClickEventDeleteUser(props.value)}
                        {...props} />
                }}
                dock={[createUserDockButton]} />
    }

    return <>
        <LoadingOverlay visible={deleteUserFetchHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {view[currentState]}
    </>
}

export default UserPage