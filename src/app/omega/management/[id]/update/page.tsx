import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveManagement } from '@/server'
import React from 'react'
import EditManagementForm from './_components/edit_management_form'

interface EditManagementPageProps {
    params: { id: string }
}
const EditManagementPage: React.FC<EditManagementPageProps> = async ({
    params
}) => {

    const data = await retriveManagement(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizacion de gerencia' />
            <EditManagementForm
                {...data} />
        </>)
}

export default EditManagementPage