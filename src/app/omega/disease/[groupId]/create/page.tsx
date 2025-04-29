import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CreateDiseaseForm from './_components/create-disease-form';

interface OmegaDiseaseCreatePageProps {
    params: { id: string }
}
const OmegaDiseaseCreatePage: React.FC<OmegaDiseaseCreatePageProps> = ({
    params
}) => {
    return (
        <>
            <ReturnableHeader title='Creacion de morbilidad' />
            <CreateDiseaseForm groupId={params.id} />
        </>)
}

export default OmegaDiseaseCreatePage