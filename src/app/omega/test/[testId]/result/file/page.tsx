import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import ResultUploadForm from './_components/result-upload-form'
import { Stack } from '@mantine/core'
import { retriveMedicalTest } from '@/server'

interface MedicalResultFileUploadProps {
  params: { testId: string }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = async ({ params }) => {

  const test = await retriveMedicalTest(params.testId);

  return (
    <>
      <ReturnableHeader title={`Carga de examen: ${test.examName}`} />
      <ModularBox flex={1}>
        <Stack h='100%' justify='center'>
          <ResultUploadForm
            testId={params.testId} />
        </Stack>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileUpload