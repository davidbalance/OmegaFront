'use client'

import React, { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import DeleteUserDialog from '@/components/user/delete-user-dialog/DeleteUserDialog';
import { UserCreateForm } from '@/components/user/user-create-form/UserCreateForm';
import { UserChangePassword } from '@/components/user/user-change-password/UserChangePassword';
import UserRoleAssign from '@/components/user/user-role-assign/UserRoleAssign';
import { User as UserType } from '@/services/api/user/dtos';
import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { useUser } from '@/hooks/useUser';
import { notifications } from '@mantine/notifications';

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_ROLES,
}

const User: React.FC = () => {

    const { users, isLoading, error, create, update, remove, select } = useUser();

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure();

    const handleCreateEvent = () => {
        setCurrentState(LayoutStates.CREATE);
    }

    const handleModificationEvent = (index: number) => {
        setCurrentState(LayoutStates.UPDATE_USER);
    }

    const handleConfigurationEvent = (index: number) => {
        setCurrentState(LayoutStates.UPDATE_ROLES);
    }

    const handleChangePasswordEvent = (index: number) => {
        setCurrentState(LayoutStates.UPDATE_PASSWORD);
    }

    const handleDeleteEvent = (index: number) => {
        DeleteDisclosure.open();
    }

    const handleClose = () => {
        DeleteDisclosure.close();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const columns: ColumnOptions<UserType>[] = [
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
        return () => { }
    }, [error]);


    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <UserCreateForm onClose={handleClose} />,
        [LayoutStates.UPDATE_USER]: <>{/* <UserUpdateDataForm onClose={handleClose} user={} /> */}</>,
        [LayoutStates.UPDATE_PASSWORD]: <UserChangePassword email={''} onClose={handleClose} />,
        [LayoutStates.UPDATE_ROLES]: <UserRoleAssign user={0} onClose={handleClose} />,
        [LayoutStates.DEFAULT]:
            <>
                <DeleteUserDialog opened={deleteState} user={0} onClose={handleClose} />
                <TableLayout<UserType>
                    title={'Usuarios'}
                    columns={columns}
                    data={users}
                    isLoading={isLoading} />
            </>
    }

    return <>
        {
            view[currentState]
        }
    </>
}

export default User