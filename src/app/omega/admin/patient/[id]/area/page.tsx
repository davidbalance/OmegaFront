import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveManagementOptions } from '@/server/management.actions'
import { retriveMedicalClientManagement } from '@/server/medical-client.actions'
import React from 'react'
import PatientActionAreaForm from './_components/patient-action-area-form'

interface PatientActionAreaPageProps {
  params: {
    id: string
  }
}
const PatientActionAreaPage: React.FC<PatientActionAreaPageProps> = async ({
  params
}) => {

  const dni = params.id;
  const options = await retriveManagementOptions();
  const medicalClient = await retriveMedicalClientManagement(dni);

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