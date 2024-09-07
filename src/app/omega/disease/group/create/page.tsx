import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import DiseaseGroupForm from './_components/disease-group-form'

interface OmegaDiseaseActionCreatePageProps { }
const OmegaDiseaseActionCreatePage: React.FC<OmegaDiseaseActionCreatePageProps> = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de grupos de morbilidades' />
            <DiseaseGroupForm />
        </>)
}

export default OmegaDiseaseActionCreatePage