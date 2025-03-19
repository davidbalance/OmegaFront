import React from 'react'
import PatientForm from './_components/patient_form'
import PatientValidateDni from './_components/patient_validate_dni_form'
import DniValidationContext from './_context/dni_validation.context'
import ReturnableHeader from '@/components/_base/returnable-header'

type AdminPatientCreateProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const AdminPatientCreate: React.FC<AdminPatientCreateProps> = ({
    searchParams
}) => {

    const allowRole = typeof searchParams.eeq === 'string' ? searchParams.eeq === 'true' : false;

    return (
        <>
            <ReturnableHeader title='Creacion paciente' />
            <DniValidationContext>
                <PatientValidateDni />
                <PatientForm allowRole={allowRole} />
            </DniValidationContext>
        </>
    )
}

export default AdminPatientCreate