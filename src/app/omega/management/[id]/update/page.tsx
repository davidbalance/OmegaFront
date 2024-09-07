import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveManagement } from '@/server/management.actions'
import React from 'react'
import Form from './_components/form'

interface OmegaManagementUpdatePageProps {
    params: { id: number }
}
const OmegaManagementUpdatePage: React.FC<OmegaManagementUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveManagement(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizacion de gerencia' />
            <Form {...data} />
        </>)
}

export default OmegaManagementUpdatePage