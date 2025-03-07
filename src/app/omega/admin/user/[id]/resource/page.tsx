import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveResources } from '@/server/resource/actions'
import { retriveUserResources } from '@/server/user/actions'
import ResourceForm from './_components/resource_form'

interface UserActionAccessPageProps {
    params: { id: string }
}
const UserActionAccessPage: React.FC<UserActionAccessPageProps> = async ({ params }) => {

    const resources = await retriveResources();
    const user = await retriveUserResources(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizar permisos' />
            <ResourceForm
                userId={params.id}
                resources={resources}
                userResources={user} />
        </>
    )
}

export default UserActionAccessPage