import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype } from '@/server/exam-subtype.actions';
import React from 'react'
import Form from './_components/form';

interface OmegaLaboratorySubtypePageProps {
    params: { id: number }
}
const OmegaLaboratorySubtypePage: React.FC<OmegaLaboratorySubtypePageProps> = async ({
    params
}) => {

    const data = await retriveExamSubtype(params.id);

    return (
        <>
            <ReturnableHeader title='Actualizacion de subtipo' />
            <Form {...data} />
        </>)
}

export default OmegaLaboratorySubtypePage