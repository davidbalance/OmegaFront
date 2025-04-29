import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveResources } from '@/server'
import { retriveUserResources } from '@/server'
import ResourceForm from './_components/resource-form'

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