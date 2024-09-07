import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ExamForm from './_components/exam-form'
import { retriveExamTypeOptions } from '@/server/exam-type.actions'
import { retriveMedicalResult } from '@/server/medical-result.actions'

interface ExamPageProps {
  params: { id: number }
}

const ExamPage: React.FC<ExamPageProps> = async ({ params }) => {

  const options = await retriveExamTypeOptions();
  const value = await retriveMedicalResult(params.id);

  return (
    <>
      <ReturnableHeader title='Administracion de tipos de examen' />
      <ExamForm
        id={params.id}
        value={value}
        options={options} />
    </>
  )
}

export default ExamPage