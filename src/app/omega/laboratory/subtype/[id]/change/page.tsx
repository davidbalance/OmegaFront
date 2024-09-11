import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype } from '@/server/exam-subtype.actions';
import React from 'react'
import ChangeTypeForm from './_components/form';
import { retriveExamTypeOptions } from '@/server/exam-type.actions';

export const dynamic = 'force-dynamic'
interface OmegaLaboratorySubtypeChangePageProps {
    params: { id: number }
}
const OmegaLaboratorySubtypeChangePage: React.FC<OmegaLaboratorySubtypeChangePageProps> = async ({
    params
}) => {

    const options = await retriveExamTypeOptions();
    const data = await retriveExamSubtype(params.id);

    return (
        <>
            <ReturnableHeader title='Cambiar tipo de examen' />
            <ChangeTypeForm options={options} {...data} />
        </>)
}

export default OmegaLaboratorySubtypeChangePage