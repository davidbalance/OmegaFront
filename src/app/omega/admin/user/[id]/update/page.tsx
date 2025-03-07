import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import EditProfileForm from './_components/edit-profile-form'
import { retriveUser } from '@/server/user/actions'

interface UserActionUpdatePageProps {
    params: { id: string }
}

const UserActionUpdatePage: React.FC<UserActionUpdatePageProps> = async ({ params }) => {

    const data = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizar usuario' />
            <EditProfileForm {...data} />
        </>
    )
}

export default UserActionUpdatePage