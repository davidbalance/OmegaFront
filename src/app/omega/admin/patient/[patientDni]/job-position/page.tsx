import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header'
import JobPositionForm from './_components/job-position-form'
import { retriveJobPositionsOptions } from '@/server/job_position/actions'
import { retriveClientJobPosition } from '@/server/medical_client/actions'

interface PatientActionJobPositionPageProps {
  params: {
    patientDni: string
  }
}
const PatientActionJobPositionPage: React.FC<PatientActionJobPositionPageProps> = async ({
  params
}) => {
  const options = await retriveJobPositionsOptions();
  const value = await retriveClientJobPosition(params.patientDni);

  const jobPositionValue = options.find(e => e.label === value.jobPosition);

  return (
    <>
      <ReturnableHeader title='Asignar puesto de trabajo' />
      <JobPositionForm
        patientDni={params.patientDni}
        jobPositionValue={jobPositionValue?.value}
        options={options} />
    </>)
}

export default PatientActionJobPositionPage