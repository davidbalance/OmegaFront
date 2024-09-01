import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveClientResources } from '../../../_actions/web-client.actions'
import { retriveNavResources } from '../../../_actions/nav-resource.actions'
import WebResourceForm from './_components/web-resource-form'

interface UserActionAccessPageProps {
    params: { id: number }
}
const UserActionAccessPage: React.FC<UserActionAccessPageProps> = async ({ params }) => {

    const resources = await retriveNavResources();
    const clientResources = await retriveClientResources(params.id);

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