import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveDiseaseGroup } from '@/server/disease_group/actions'
import React from 'react'
import EditDiseaseGroupForm from './_components/disease-group-form'

interface OmegaDiseaseGroupUpdatePageProps {
    params: { id: string }
}
const OmegaDiseaseGroupUpdatePage: React.FC<OmegaDiseaseGroupUpdatePageProps> = async ({
    params
}) => {

    const data = await retriveDiseaseGroup(params.id);

    return (
        <>
            <ReturnableHeader title='Modificacion del grupo de morbilidades' />
            <EditDiseaseGroupForm {...data} />
        </>)
}

export default OmegaDiseaseGroupUpdatePage