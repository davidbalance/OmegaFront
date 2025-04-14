import React from 'react'

import StepperUserForm from './_components/stepper_user_form'
import LogoSelectForm from '@/components/user/form/logo_select_form'
import ReturnableHeader from '@/components/_base/returnable-header'
import AuthFormPassword from '@/components/auth/auth-password-form'
import ResourceAssignForm from '@/components/resource_assign_form'
import ProfileForm from '@/components/user/profile_form'
import { retriveResources } from '@/server'
import { retriveLogos } from '@/server'
import CheckProfileForm from './_components/check_profile_form'

const UserActionCreatePage: React.FC = async () => {

    const resources = await retriveResources();
    const logos = await retriveLogos();

    return (
        <>
            <ReturnableHeader title='Creacion de usuario' />
            <StepperUserForm
                headers={[
                    { description: 'Perfil del usuario', icon: 'user-check' },
                    { description: 'Credenciales', icon: 'lock' },
                    { description: 'Asignacion de recursos', icon: 'license' },
                    { description: 'Logo de la aplicacion', icon: 'building' },
                    { description: 'Revision de los datos', icon: 'check' },
                ]}>
                <ProfileForm />
                <AuthFormPassword />
                <ResourceAssignForm resources={resources} />
                <LogoSelectForm options={logos} />
                <CheckProfileForm resources={resources} logos={logos} />
            </StepperUserForm>
        </>
    )
}

export default UserActionCreatePage