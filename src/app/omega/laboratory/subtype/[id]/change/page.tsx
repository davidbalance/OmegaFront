import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype } from '@/server/exam-subtype.actions';
import { retriveFullExam } from '@/server/exam-type.actions';
import React from 'react'
import Form from './_components/form';

interface OmegaLaboratorySubtypeChangePageProps {
    params: { id: number }
}
const OmegaLaboratorySubtypeChangePage: React.FC<OmegaLaboratorySubtypeChangePageProps> = async ({
    params
}) => {

    const data = await retriveExamSubtype(params.id);
    const options = await retriveFullExam();

    return (
        <>
            <ReturnableHeader title='Cambiar tipo de examen' />
            <Form options={options} {...data} />
        </>)
}

export default OmegaLaboratorySubtypeChangePage