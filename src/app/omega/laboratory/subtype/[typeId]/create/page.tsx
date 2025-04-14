import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateSubtypeForm from './_components/create_subtype_form';

interface CreateSubtypeFormPageProps {
    params: { typeId: string }
}
const CreateSubtypeFormPage: React.FC<CreateSubtypeFormPageProps> = ({
    params
}) => {
    return (
        <>
            <ReturnableHeader title='Creacion de subtipo' />
            <CreateSubtypeForm typeId={params.typeId} />
        </>)

}

export default CreateSubtypeFormPage