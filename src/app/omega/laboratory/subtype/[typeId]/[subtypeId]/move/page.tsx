import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import MoveSubtypeForm from './_components/move-subtype-form';
import { retriveExamTypesOptions } from '@/server';

interface OmegaLaboratorySubtypeChangePageProps {
    params: {
        typeId: string;
        subtypeId: string;
    }
}
const OmegaLaboratorySubtypeChangePage: React.FC<OmegaLaboratorySubtypeChangePageProps> = async ({
    params
}) => {

    const options = await retriveExamTypesOptions();

    return (
        <>
            <ReturnableHeader title='Cambiar tipo de examen' />
            <MoveSubtypeForm
                fromTypeId={params.typeId}
                subtypeId={params.subtypeId}
                options={options} />
        </>)
}

export default OmegaLaboratorySubtypeChangePage