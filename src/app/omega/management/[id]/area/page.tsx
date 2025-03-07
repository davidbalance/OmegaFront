import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateAreaForm from './_components/create-area-form'

interface CreateAreaFormPageProps {
    params: { id: number }
}
const CreateAreaFormPage: React.FC<CreateAreaFormPageProps> = ({
    params
}) => {
    return (
        <>
            <ReturnableHeader title='Creacion de area' />
            <CreateAreaForm />
        </>)
}

export default CreateAreaFormPage