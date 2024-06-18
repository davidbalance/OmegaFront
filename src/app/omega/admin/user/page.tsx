'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { notifications } from '@mantine/notifications';
import { LoadingOverlay } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useList } from '@/hooks/useList';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { ResponsiveButton } from '@/components/buttons/responsive-button/ResponsiveButton';
import { User } from '@/lib/dtos/user/user.response.dto';
import { UserFormCreate } from '@/components/user/form/UserFormCreate';
import { UserFormUpdate } from '@/components/user/form/UserFormUpdate';
import { UserFormWebResource } from '@/components/user/form/UserFormWebResource';
import { UserFormChangePassword } from '@/components/user/form/UserFormChangePassword';
import { UserActionButton } from '@/components/user/action/UserActionButton';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_WEB_RESOURCES,
    UPDATE_COMPANY,
}

const columns: ColumnOptions<User>[] = [
    { name: 'CI', key: 'dni' },
    { name: 'Nombre', key: 'name' },
    { name: 'Apellido', key: 'lastname' },
    { name: 'Correo Electronico', key: 'email' },
]

const UserPage: React.FC = () => {

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [selected, setSelected] = useState<User | null>(null);
    const [shouldDeleteUser, setShouldDeleteUser] = useState<boolean>(false);

    const [users, {
        append: userAppend,
        override: userOverride,
        remove: userRemove,
        update: userUpdate
    }] = useList<User>([]);

    const {
        data: fetchUsers,
        error: fetchUsersError,
        loading: fetchUsersLoading
    } = useFetch<User[]>('/api/users', 'GET');

    const {
        data: deleteData,
        error: deleteError,
        loading: deleteLoading,
        reload: deleteReload
    } = useFetch<any>(`/api/users/${selected?.id!}`, 'DELETE', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClickEventCreate = useCallback(() => {
        setCurrentState(LayoutStates.CREATE);
    }, []);

    const handleClickEventUpdateUser = useCallback((user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_USER);
    }, []);

    const handleClickEventUpdatePassword = useCallback((user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_PASSWORD);
    }, []);

    const handleClickEventUpdateRole = useCallback((user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_WEB_RESOURCES);
    }, []);

    const handleClickEventUpdateCompany = useCallback((user: User) => {
        setSelected(user);
        setCurrentState(LayoutStates.UPDATE_COMPANY);
    }, []);

    const handleClickEventDeleteUser = useCallback(async (user: User) => {
        setSelected(user);
        const confirmed = await show("Eliminacion del usuario", `El usuario ${user.name} ${user.lastname} sera eliminado. ¿Está de acuerdo?`);
        if (confirmed) {
            setShouldDeleteUser(true);
        } else {
            setSelected(null);
        }
    }, [show])


    const handleClickEventClose = useCallback(() => {
        setSelected(null);
        setCurrentState(LayoutStates.DEFAULT);
    }, []);

    const handleFormSubmittionEventCreate = useCallback((user: User) => userAppend(user), [userAppend]);

    const handleFormSubmittionEventUpdateUser = useCallback((user: User) => userUpdate('id', user.id!, user), [userUpdate]);

    useEffect(() => {
        if (fetchUsersError) notifications.show({ message: fetchUsersError.message, color: 'red' });
        else if (deleteError) notifications.show({ message: deleteError.message, color: 'red' });
    }, [fetchUsersError, deleteError]);

    useEffect(() => {
        if (fetchUsers) userOverride(fetchUsers);
    }, [fetchUsers, userOverride]);

    useEffect(() => {
        if (selected && shouldDeleteUser) {
            deleteReload();
            setShouldDeleteUser(false);
        }
    }, [selected, shouldDeleteUser]);

    useEffect(() => {
        if (deleteData) {
            userRemove('id', selected?.id!);
            setSelected(null);
        }
    }, [deleteData, userRemove]);

    const createUserDockButton = useMemo(() => (
        <ResponsiveButton key='create-user-dock' onClick={handleClickEventCreate} label={'Nuevo usuario'} icon={<IconPlus />} />
    ), [handleClickEventCreate]);

    const view: Record<LayoutStates, React.ReactNode> = useMemo(() => ({
        [LayoutStates.CREATE]: <UserFormCreate
            onClose={handleClickEventClose}
            onFormSubmit={handleFormSubmittionEventCreate}
        />,
        [LayoutStates.UPDATE_USER]: <UserFormUpdate
            onClose={handleClickEventClose}
            user={selected!}
            onFormSubmittion={handleFormSubmittionEventUpdateUser}
        />,
        [LayoutStates.UPDATE_PASSWORD]: <UserFormChangePassword
            onClose={handleClickEventClose}
            email={selected?.email!}
        />,
        [LayoutStates.UPDATE_WEB_RESOURCES]: <UserFormWebResource
            user={selected!}
            onClose={handleClickEventClose}
        />,
        [LayoutStates.UPDATE_COMPANY]: <UserFormAssignCompanyAttribute
            url={`/api/users/attribute/look/for/company/${selected?.id}`}
            onClose={handleClickEventClose}
        />,
        [LayoutStates.DEFAULT]:
            <TableLayout<User>
                title={'Usuarios'}
                columns={columns}
                data={users}
                isLoading={fetchUsersLoading}
                action={{
                    name: 'Acciones',
                    child: (props) => <UserActionButton
                        onModification={() => handleClickEventUpdateUser(props.value)}
                        onChangePassword={() => handleClickEventUpdatePassword(props.value)}
                        onResourceChange={() => handleClickEventUpdateRole(props.value)}
                        onDelete={() => handleClickEventDeleteUser(props.value)}
                        onLookForCompany={() => handleClickEventUpdateCompany(props.value)}
                        {...props} />
                }}
                dock={[createUserDockButton]}
            />
    }), [
        handleClickEventClose,
        handleFormSubmittionEventCreate,
        handleClickEventClose,
        selected,
        handleFormSubmittionEventUpdateUser,
        handleClickEventClose,
        users,
        fetchUsersLoading,
        handleClickEventUpdateUser,
        handleClickEventUpdatePassword,
        handleClickEventUpdateRole,
        handleClickEventDeleteUser
    ]);

    return <>
        <LoadingOverlay visible={deleteLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {view[currentState]}
    </>
}

export default UserPage