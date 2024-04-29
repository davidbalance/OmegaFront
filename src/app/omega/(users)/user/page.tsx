'use client'

import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '@/hooks';
import DeleteUserDialog from '@/components/user/delete-user-dialog/DeleteUserDialog';
import UserLayout from '@/components/user/user-layout/UserLayout';
import { UserCreateForm } from '@/components/user/user-create-form/UserCreateForm';
import { UserUpdateDataForm } from '@/components/user/user-update-data-form/UserUpdateDataForm';
import { UserChangePassword } from '@/components/user/user-change-password/UserChangePassword';
import UserRoleAssign from '@/components/user/user-role-assign/UserRoleAssign';

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_ROLES,
}

const User: React.FC = () => {

    const userHook = useUser(true);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure();

    const handleCreateEvent = () => { setCurrentState(LayoutStates.CREATE); }

    const handleModificationEvent = (index: number) => {
        userHook.selectItem(index);
        setCurrentState(LayoutStates.UPDATE_USER);
    }

    const handleConfigurationEvent = (index: number) => {
        userHook.selectItem(index);
        setCurrentState(LayoutStates.UPDATE_ROLES);
    }

    const handleChangePasswordEvent = (index: number) => {
        userHook.selectItem(index);
        setCurrentState(LayoutStates.UPDATE_PASSWORD);
    }

    const handleDeleteEvent = (index: number) => {
        userHook.selectItem(index);
        DeleteDisclosure.open();
    }

    const handleClose = () => {
        userHook.clearSelection();
        userHook.find();
        DeleteDisclosure.close();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <UserCreateForm onClose={handleClose} />,
        [LayoutStates.UPDATE_USER]: <UserUpdateDataForm onClose={handleClose} user={userHook.user!} />,
        [LayoutStates.UPDATE_PASSWORD]: <UserChangePassword email={userHook.user?.email!} onClose={handleClose} />,
        [LayoutStates.UPDATE_ROLES]: <UserRoleAssign user={userHook.user?.id!} onClose={handleClose} />,
        [LayoutStates.DEFAULT]:
            <>
                <DeleteUserDialog opened={deleteState} user={userHook.user?.id || -1} onClose={handleClose} />
                <UserLayout
                    load={userHook.loading}
                    users={userHook.users}
                    events={{
                        onCreate: handleCreateEvent,
                        onModification: handleModificationEvent,
                        onConfiguration: handleConfigurationEvent,
                        onChangePassword: handleChangePasswordEvent,
                        onDelete: handleDeleteEvent
                    }} />
            </>
    }

    return <>
        {
            view[currentState]
        }
    </>
}

export default User