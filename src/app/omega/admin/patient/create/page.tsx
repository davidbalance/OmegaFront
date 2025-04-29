import React from 'react'
import PatientForm from './_components/patient-form'
import PatientValidateDni from './_components/patient-validate-dni-form'
import DniValidationContext from './_context/dni-validation.context'
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