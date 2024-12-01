import React from 'react'
import MedicalClientForm from './_components/medical-client-form'
import MedicalClientValidateDniForm from './_components/medical-client-validate-dni-form'
import MedicalClientValidateDniProvider from './_context/medical-client-validate-dni.context'
import ReturnableHeader from '@/components/_base/returnable-header'

const AdminPatientCreate = () => {
    return (
        <>
            <ReturnableHeader title='Creacion paciente' />
            <MedicalClientValidateDniProvider>
                <MedicalClientValidateDniForm />
                <MedicalClientForm />
            </MedicalClientValidateDniProvider>
        </>
    )
}

export default AdminPatientCreate