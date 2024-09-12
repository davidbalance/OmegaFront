import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import DiseaseGroupForm from './_components/disease-group-form'

export const dynamic = 'force-dynamic'
const OmegaDiseaseCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de grupos de morbilidades' />
            <DiseaseGroupForm />
        </>)
}

export default OmegaDiseaseCreatePage