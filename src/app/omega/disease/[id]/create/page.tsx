import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import DiseaseForm from './_components/form';

interface OmegaDiseaseCreatePageProps {
    params: { id: number }
}
const OmegaDiseaseCreatePage: React.FC<OmegaDiseaseCreatePageProps> = ({
    params
}) => {
    const group = params.id;


    return (
        <>
            <ReturnableHeader title='Creacion de morbilidad' />
            <DiseaseForm group={group} />
        </>)
}

export default OmegaDiseaseCreatePage