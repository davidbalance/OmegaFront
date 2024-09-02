import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import PatientActionAreaForm from './_components/patient-action-area-form'
import { retriveClientManagement } from '../../../_actions/medical-client-management.actions'
import { retriveManagements } from '../../../_actions/management.actions'

interface PatientActionAreaPageProps {
  params: {
    id: string
  }
}
const PatientActionAreaPage: React.FC<PatientActionAreaPageProps> = async ({
  params
}) => {

  const dni = params.id;
  const medicalClient = await retriveClientManagement(dni);
  const options = await retriveManagements();

  return (
    <>
      <ReturnableHeader title='Asignar area y gerencia' />
      <PatientActionAreaForm
        dni={dni}
        options={options}
        area={medicalClient.areaId}
        management={medicalClient.managementId} />
    </>
  )
}

export default PatientActionAreaPage