import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveMedicalClientJobPosition } from '@/server/medical-client.actions'
import { retriveJobPositionOptions } from '@/server/job-position.actions'
import PatientJobPositionForm from './_components/patient-job-position-form'

interface PatientActionJobPositionPageProps {
  params: {
    id: string
  }
}
const PatientActionJobPositionPage: React.FC<PatientActionJobPositionPageProps> = async ({
  params
}) => {

  const dni = params.id;
  const value = await retriveMedicalClientJobPosition(dni);
  const options = await retriveJobPositionOptions();

  return (
    <>
      <ReturnableHeader title='Asignar area y gerencia' />
      <PatientJobPositionForm
        dni={dni}
        value={value.jobPositionName}
        options={options} />
    </>)
}

export default PatientActionJobPositionPage