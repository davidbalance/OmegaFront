import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import ChangePasswordForm from './_components/change-password-form';
import { retriveUser } from '@/server/user.actions';

interface UserActionPasswordPageProps {
    params: { id: number }
}

const UserActionPasswordPage: React.FC<UserActionPasswordPageProps> = async ({ params }) => {

    const user = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Cambiar contraseña' />
            <ChangePasswordForm email={user.email} />
        </>
    )
}

export default UserActionPasswordPage