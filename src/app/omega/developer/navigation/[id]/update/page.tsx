import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ResourceForm from './_components/resource-form'
import { retriveWebResource } from '@/server/web-resource.actions'

export const dynamic = 'force-dynamic'
interface OmegaDeveloperNavigationUpdatePageProps {
    params: { id: number }
}
const OmegaDeveloperNavigationUpdatePage: React.FC<OmegaDeveloperNavigationUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveWebResource(params.id);
    console.log(data);

    return (
        <>
            <ReturnableHeader title='Actualizacion de recursos' />
            <ResourceForm {...data} />
        </>
    )
}

export default OmegaDeveloperNavigationUpdatePage