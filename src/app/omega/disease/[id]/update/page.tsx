import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import DiseaseForm from './_components/disease-form'
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
            <DiseaseForm {...data} />
        </>)
}

export default OmegaDiseaseUpdatePage