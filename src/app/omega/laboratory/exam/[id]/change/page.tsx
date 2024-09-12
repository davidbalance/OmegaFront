import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExam } from '@/server/exam.actions';
import React from 'react'
import ChangeSubtypeForm from './_components/exam-form';
import { retriveExamTypeOptions } from '@/server/exam-type.actions';

export const dynamic = 'force-dynamic'
interface OmegaLaboratoryExamChangePageProps {
    params: { id: number }
}
const OmegaLaboratoryExamChangePage: React.FC<OmegaLaboratoryExamChangePageProps> = async ({
    params
}) => {
    const data = await retriveExam(params.id);
    const options = await retriveExamTypeOptions();

    return (
        <>
            <ReturnableHeader title='Cambiar subtipo de examen' />
            <ChangeSubtypeForm options={options} {...data} />
        </>)
}

export default OmegaLaboratoryExamChangePage