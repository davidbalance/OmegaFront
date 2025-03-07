import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import ResultUploadForm from './_components/result_upload_form'
import { Stack } from '@mantine/core'

interface MedicalReportFileUploadProps {
  params: { testId: string }
}
const MedicalReportFileUpload: React.FC<MedicalReportFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de resultado medico' />
      <ModularBox flex={1}>
        <Stack h='100%' justify='center'>
          <ResultUploadForm
            testId={params.testId} />
        </Stack>
      </ModularBox>
    </>
  )
}

export default MedicalReportFileUpload