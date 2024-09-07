import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import Form from './_components/form'
import { retriveArea } from '@/server/area.actions'

interface AreaUpdatePageProps {
    params: { id: number }
}
const AreaUpdatePage: React.FC<AreaUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveArea(params.id);
    return (
        <>
            <ReturnableHeader title='Actualizacion de area' />
            <Form {...data} />
        </>)
}

export default AreaUpdatePage
