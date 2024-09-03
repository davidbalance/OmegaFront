import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ExamForm from './_components/exam-form'
import { retriveExamType } from '../../../../_actions/exam-type.actions';
import { retriveMedicalResultExam } from '../../../../_actions/medical-result-exam.actions';

interface ExamPageProps {
  params: { id: number }
}

const ExamPage: React.FC<ExamPageProps> = async ({ params }) => {

  const options = await retriveExamType();
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