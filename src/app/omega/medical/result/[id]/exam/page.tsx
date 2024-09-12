import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ExamForm from './_components/exam-form'
import { retriveExamTypeOptions } from '@/server/exam-type.actions'
import { retriveMedicalResult } from '@/server/medical-result.actions'

export const dynamic = 'force-dynamic'
interface ExamPageProps {
  params: { id: number }
}
const ExamPage: React.FC<ExamPageProps> = async ({ params }) => {

  const value = await retriveMedicalResult(params.id);
  const options = await retriveExamTypeOptions();

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