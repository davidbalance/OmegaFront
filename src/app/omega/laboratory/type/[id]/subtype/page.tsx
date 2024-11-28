import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ExamSubtypeForm from './_components/exam-subtype-form';

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
            <ExamSubtypeForm type={type} />
        </>)

}

export default OmegaLaboratoryTypeSubtypePage