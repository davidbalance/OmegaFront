import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import WebResourceForm from './_components/web-resource-form'
import { retriveNavResources } from '@/server/web-resource.actions'
import { retriveClientResource } from '@/server/web-client.actions'

interface UserActionAccessPageProps {
    params: { id: number }
}
const UserActionAccessPage: React.FC<UserActionAccessPageProps> = async ({ params }) => {

    const resources = await retriveNavResources();
    const clientResources = await retriveClientResource(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizar permisos' />
            <WebResourceForm
                id={params.id}
                resources={resources}
                data={{
                    resources: clientResources.map(e => e.id)
                }} />
        </>
    )
}

export default UserActionAccessPage