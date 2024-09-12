import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveDiseaseGroup } from '@/server/disease-group.actions'
import React from 'react'
import DiseaseFormGroup from './_components/disease-group-form'

export const dynamic = 'force-dynamic'
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
            <DiseaseFormGroup id={params.id} name={data.name} />
        </>)
}

export default OmegaDiseaseGroupUpdatePage