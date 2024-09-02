import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import PatientJobPositionForm from './_components/patient-job-position-form'
import { retriveJobPositions } from '../../../../_actions/job-position.actions'
import { retriveClientJobPosition } from '../../../../_actions/medical-job-position.actions'

interface PatientActionJobPositionPageProps {
  params: {
    id: string
  }
}
const PatientActionJobPositionPage: React.FC<PatientActionJobPositionPageProps> = async ({
  params
}) => {

  const dni = params.id;
  const value = await retriveClientJobPosition(dni);
  const options = await retriveJobPositions();

  return (
    <>
      <ReturnableHeader title='Asignar area y gerencia' />
      <PatientJobPositionForm
        dni={dni}
        value={value}
        options={options} />
    </>)
}

export default PatientActionJobPositionPage