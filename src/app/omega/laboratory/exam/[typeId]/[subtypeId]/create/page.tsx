import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype, retriveExamTypes } from '@/server';
import React from 'react'
import CreateExamForm from './_components/create-exam-form';

interface OmegaLaboratoryExamCreatePageProps {
    params: {
        typeId: string;
        subtypeId: string;
    }
}
const OmegaLaboratoryExamCreatePage: React.FC<OmegaLaboratoryExamCreatePageProps> = async ({
    params
}) => {

    const types = await retriveExamTypes({ skip: 0, limit: 100 });
    const type = types.data.find(e => e.typeId === params.typeId);

    const subtype = await retriveExamSubtype(params.subtypeId);

    return (
        <>
            <ReturnableHeader title={`Crear examen: ${type?.typeName} -> ${subtype.subtypeName}`} />
            <CreateExamForm
                typeId={params.typeId}
                subtypeId={params.subtypeId} />
        </>);
}

export default OmegaLaboratoryExamCreatePage