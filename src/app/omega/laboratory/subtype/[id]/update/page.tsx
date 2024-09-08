import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype } from '@/server/exam-subtype.actions';
import React from 'react'
import ExamSubtypeForm from './_components/exam-subtype-form';

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
            <ExamSubtypeForm {...data} />
        </>)
}

export default OmegaLaboratorySubtypePage