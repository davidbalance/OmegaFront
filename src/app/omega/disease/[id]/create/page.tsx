import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import Form from './_components/form';

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
            <Form group={group} />
        </>)
}

export default OmegaDiseaseCreatePage