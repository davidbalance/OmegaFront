import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import Form from './_components/form'
import { retriveDisease } from '@/server/disease.actions'

interface OmegaDiseaseUpdatePageProps {
    params: { id: number }
}
const OmegaDiseaseUpdatePage: React.FC<OmegaDiseaseUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveDisease(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizar de morbilidad' />
            <Form {...data} />
        </>)
}

export default OmegaDiseaseUpdatePage