import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import React from 'react'
import BackButton from '@/components/_base/back-button'
import AuthFormPassword from '@/components/authentication/form/auth-form-password'
import UserDataForm from '@/components/user/form/user-data-form'
import WebResourceFormAssign from '@/components/web/resource/form/WebResourceFormAssign'
import UserForm from './_components/user-form'
import { retriveNavResources } from '../../_actions/nav-resource.actions'
import UserFormLogo from '@/components/user/form/UserFormLogo'

const UserActionCreatePage: React.FC = async () => {

    const resources = await retriveNavResources();

    return (
        <>
            <ModularBox align='center' justify='flex-start' direction='row'>
                <BackButton />
                <Box w='93%'>
                    <Title ta='center' order={4}>Creacion de usuarios</Title>
                </Box>
            </ModularBox>
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