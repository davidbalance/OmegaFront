import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveExamSubtype } from '@/server';
import React from 'react'
import EditSubtypeForm from './_components/edit-subtype-form';

interface EditSubtypeFormPageProps {
    params: {
        typeId: string;
        subtypeId: string;
    }
}
const EditSubtypeFormPage: React.FC<EditSubtypeFormPageProps> = async ({
    params
}) => {

    const data = await retriveExamSubtype(params.subtypeId);

    return (
        <>
            <ReturnableHeader title='Actualizacion de subtipo' />
            <EditSubtypeForm
                typeId={params.typeId}
                {...data} />
        </>)
}

export default EditSubtypeFormPage