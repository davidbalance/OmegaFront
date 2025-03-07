import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveArea } from '@/server/area/actions'
import EditAreaForm from './_components/edit_area_form'

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
