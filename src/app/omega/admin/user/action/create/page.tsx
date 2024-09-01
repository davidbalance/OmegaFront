import React from 'react'
import AuthFormPassword from '@/components/authentication/form/auth-form-password'
import UserDataForm from '@/components/user/form/user-data-form'
import WebResourceFormAssign from '@/components/web/resource/form/web-resource-form-assign'
import UserForm from './_components/user-form'
import { retriveNavResources } from '../../_actions/nav-resource.actions'
import UserFormLogo from '@/components/user/form/user-form-logo'
import ReturnableHeader from '@/components/_base/returnable-header'

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