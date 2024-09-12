import React from 'react'
import UserDataForm from '@/components/user/form/user-data-form'
import UserForm from './_components/user-form'
import UserFormLogo from '@/components/user/form/user-form-logo'
import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveNavResources } from '@/server/web-resource.actions'
import AuthFormPassword from '@/components/auth-form-password'
import WebResourceFormAssign from '@/components/web-resource-form-assign'

const UserActionCreatePage: React.FC = async () => {

    const resources = await retriveNavResources();

    return (
        <>
            <ReturnableHeader title='Creacion de usuario' />
            <UserForm>
                <UserDataForm />
                <AuthFormPassword />
                <WebResourceFormAssign resources={resources} />
                <UserFormLogo />
            </UserForm>
        </>
    )
}

export default UserActionCreatePage