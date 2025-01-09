import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveManagementOptions } from '@/server/management.actions'
import { retriveMedicalClientManagement } from '@/server/medical-client.actions'
import React from 'react'
import PatientActionAreaForm from './_components/patient-action-area-form'
import { retriveAreaOptions } from '@/server/area.actions'

interface PatientActionAreaPageProps {
  params: {
    id: string
  }
}
const PatientActionAreaPage: React.FC<PatientActionAreaPageProps> = async ({
  params
}) => {

  const dni = params.id;
  const managementOptions = await retriveManagementOptions();
  const areaOptions = await retriveAreaOptions();
  const medicalClient = await retriveMedicalClientManagement(dni);

  console.log(managementOptions);
  console.log(areaOptions);

  return (
    <>
      <ReturnableHeader title='Asignar area y gerencia' />
      <PatientActionAreaForm
        dni={dni}
        managementOptions={managementOptions}
        areaOptions={areaOptions}
        area={medicalClient.areaId}
        management={medicalClient.managementId} />
    </>
  )
}

export default PatientActionAreaPage