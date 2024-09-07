import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveFullExam } from '@/server/exam-type.actions';
import { retriveExam } from '@/server/exam.actions';
import React from 'react'
import Form from './_components/form';

interface OmegaLaboratoryExamChangePageProps {
    params: { id: number }
}
const OmegaLaboratoryExamChangePage: React.FC<OmegaLaboratoryExamChangePageProps> = async ({
    params
}) => {
    const data = await retriveExam(params.id);
    const options = await retriveFullExam();

    return (
        <>
            <ReturnableHeader title='Cambiar subtipo de examen' />
            <Form options={options} {...data} />
        </>)
}

export default OmegaLaboratoryExamChangePage