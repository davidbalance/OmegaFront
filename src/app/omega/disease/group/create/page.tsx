import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import Form from './_components/disease-group-form'

interface OmegaDiseaseActionCreatePageProps { }
const OmegaDiseaseActionCreatePage: React.FC<OmegaDiseaseActionCreatePageProps> = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de grupos de morbilidades' />
            <Form />
        </>)
}

export default OmegaDiseaseActionCreatePage