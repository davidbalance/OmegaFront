import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import MoveExamForm from './_components/move-exam-form';
import { retriveExamTypesOptions } from '@/server';

interface OmegaLaboratoryExamChangePageProps {
    params: {
        typeId: string;
        subtypeId: string;
        examId: string;
    }
}
const OmegaLaboratoryExamChangePage: React.FC<OmegaLaboratoryExamChangePageProps> = async ({
    params
}) => {
    const options = await retriveExamTypesOptions();

    return (
        <>
            <ReturnableHeader title='Cambiar subtipo de examen' />
            <MoveExamForm
                options={options}
                fromTypeId={params.typeId}
                fromSubtypeId={params.subtypeId}
                examId={params.examId} />
        </>)
}

export default OmegaLaboratoryExamChangePage