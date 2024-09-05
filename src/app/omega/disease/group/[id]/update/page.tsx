import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveDiseaseGroup } from '@/server/disease-group.actions'
import React from 'react'
import Form from './_components/form'

interface OmegaDiseaseGroupUpdatePageProps {
    params: { id: number }
}
const OmegaDiseaseGroupUpdatePage: React.FC<OmegaDiseaseGroupUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveDiseaseGroup(params.id);

    return (
        <>
            <ReturnableHeader title='Modificacion del grupo de morbilidades' />
            <Form id={params.id} name={data.name} />
        </>)
}

export default OmegaDiseaseGroupUpdatePage