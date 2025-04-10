import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import ChangePasswordForm from './_components/change_password_form';
import { retriveUser } from '@/server';

interface UserActionPasswordPageProps {
    params: { id: string }
}

const UserActionPasswordPage: React.FC<UserActionPasswordPageProps> = async ({ params }) => {

    const user = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Cambiar contraseña' />
            <ChangePasswordForm email={user.userEmail} />
        </>
    )
}

export default UserActionPasswordPage