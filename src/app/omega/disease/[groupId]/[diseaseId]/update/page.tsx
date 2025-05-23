import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveDisease } from '@/server'
import EditDiseaseForm from './_components/edit-disease-form'

interface OmegaDiseaseUpdatePageProps {
    params: { groupId: string, diseaseId: string }
}
const OmegaDiseaseUpdatePage: React.FC<OmegaDiseaseUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveDisease(params.diseaseId);

    return (
        <>
            <ReturnableHeader title='Actualizar de morbilidad' />
            <EditDiseaseForm groupId={params.groupId} {...data} />
        </>)
}

export default OmegaDiseaseUpdatePage