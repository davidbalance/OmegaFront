import React from 'react'
import PatientForm from './_components/patient_form'
import PatientValidateDni from './_components/patient_validate_dni_form'
import DniValidationContext from './_context/dni_validation.context'
import ReturnableHeader from '@/components/_base/returnable-header'

const AdminPatientCreate: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion paciente' />
            <DniValidationContext>
                <PatientValidateDni />
                <PatientForm />
            </DniValidationContext>
        </>
    )
}

export default AdminPatientCreate