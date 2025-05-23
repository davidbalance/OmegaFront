import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveArea } from '@/server'
import EditAreaForm from './_components/edit-area-form'

interface AreaUpdatePageProps {
    params: { id: string }
}
const AreaUpdatePage: React.FC<AreaUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveArea(params.id);
    return (
        <>
            <ReturnableHeader title='Actualizacion de area' />
            <EditAreaForm {...data} />
        </>)
}

export default AreaUpdatePage
