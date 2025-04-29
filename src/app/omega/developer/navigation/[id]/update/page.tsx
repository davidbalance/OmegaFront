import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import EditResourceForm from './_components/edit-resource-form'
import { retriveResource } from '@/server'

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