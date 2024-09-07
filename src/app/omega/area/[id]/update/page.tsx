import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveArea } from '@/server/area.actions'
import AreaForm from './_components/area-form'

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
            <AreaForm {...data} />
        </>)
}

export default AreaUpdatePage
