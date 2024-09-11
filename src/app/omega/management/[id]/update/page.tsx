import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveManagement } from '@/server/management.actions'
import React from 'react'
import ManagementForm from './_components/management-form'

export const dynamic = 'force-dynamic'
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
            <ManagementForm {...data} />
        </>)
}

export default OmegaManagementUpdatePage