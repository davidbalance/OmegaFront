import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import ReportUploadForm from './_components/report_upload_form'
import { Stack } from '@mantine/core'
import { retriveMedicalTest } from '@/server'

interface MedicalResultFileUploadProps {
  params: { testId: string }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = async ({ params }) => {

  const test = await retriveMedicalTest(params.testId);

  return (
    <>
      <ReturnableHeader title={`Carga de reporte: ${test.examName}`} />
      <ModularBox
        h='100%'
        flex={1}>
        <Stack h='100%' justify='center'>
          <ReportUploadForm testId={params.testId} />
        </Stack>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileUpload