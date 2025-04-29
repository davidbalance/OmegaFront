import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateDiseaseGroupForm from './_components/create-disease-group-form'

const DiseaseGroupCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de grupos de morbilidades' />
            <CreateDiseaseGroupForm />
        </>)
}

export default DiseaseGroupCreatePage