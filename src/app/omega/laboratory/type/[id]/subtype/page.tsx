import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import Form from './_components/form';

interface OmegaLaboratoryTypeSubtypePageProps {
    params: { id: number }
}
const OmegaLaboratoryTypeSubtypePage: React.FC<OmegaLaboratoryTypeSubtypePageProps> = ({
    params
}) => {

    const type: number = Number(params.id);

    return (
        <>
            <ReturnableHeader title='Creacion de subtipo' />
            <Form type={type} />
        </>)

}

export default OmegaLaboratoryTypeSubtypePage