import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveUser } from '../../../_actions/user.actions'
import UserForm from './_components/user-form'

interface UserActionUpdatePage {
    params: { id: number }
}

const UserActionUpdatePage: React.FC<UserActionUpdatePage> = async ({ params }) => {

    const user = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizar usuario' />
            <UserForm {...user} id={params.id} />
        </>
    )
}

export default UserActionUpdatePage