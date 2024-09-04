import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ExamForm from './_components/exam-form'
import { retriveFullExam } from '../../../../../../../../server/exam-type.actions';
import { retriveMedicalResultExam } from '../../../../../../../../server/medical-result-exam.actions';

interface ExamPageProps {
  params: { id: number }
}

const ExamPage: React.FC<ExamPageProps> = async ({ params }) => {

  const options = await retriveFullExam();
  const value = await retriveMedicalResultExam(params.id);

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