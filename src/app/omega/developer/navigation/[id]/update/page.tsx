import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import EditResourceForm from './_components/edit_resource_form'
import { retriveResource } from '@/server/resource/actions'

interface DeveloperNavigationUpdatePageProps {
    params: { id: string }
}
const DeveloperNavigationUpdatePage: React.FC<DeveloperNavigationUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveResource(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizacion de recursos' />
            <EditResourceForm {...data} />
        </>
    )
}

export default DeveloperNavigationUpdatePage