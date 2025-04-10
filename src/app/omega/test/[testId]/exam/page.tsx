import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import { retriveExamTypesOptions } from '@/server'
import { retriveMedicalTest } from '@/server'
import ExamForm from './_components/exam-form'

interface ExamPageProps {
  params: { testId: string }
}
const ExamPage: React.FC<ExamPageProps> = async ({ params }) => {

  const options = await retriveExamTypesOptions();
  const value = await retriveMedicalTest(params.testId);

  const examTypeValue = options.find(e => e.label === value.examType);
  const examSubtypeValue = examTypeValue?.children.find(e => e.label === value.examSubtype);
  const examValue = examSubtypeValue?.children.find(e => e.label === value.examName);

  return (
    <>
      <ReturnableHeader title='Administracion de tipos de examen' />
      <ExamForm
        testId={params.testId}
        examTypeValue={examTypeValue ? { name: examTypeValue.label, value: examTypeValue.value } : undefined}
        examSubtypeValue={examSubtypeValue ? { name: examSubtypeValue.label, value: examSubtypeValue.value } : undefined}
        examValue={examValue ? { name: examValue.label, value: examValue.value } : undefined}
        options={options} />
    </>
  )
}

export default ExamPage