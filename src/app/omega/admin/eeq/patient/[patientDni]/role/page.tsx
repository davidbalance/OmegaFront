import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import RoleForm from './_components/role-form'
import { retriveClientByDni } from '@/server'

type PatientRoleFormPageProps = {
    params: { patientDni: string }
}
const PatientRoleFormPage: React.FC<PatientRoleFormPageProps> = async ({
    params
}) => {

    const patient = await retriveClientByDni(params.patientDni);

    return (
        <>
            <ReturnableHeader title={`Modificar rol: ${params.patientDni}`} />
            <RoleForm {...patient} />
        </>)
}

export default PatientRoleFormPage