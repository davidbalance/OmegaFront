import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import ReportUploadForm from './_components/report_upload_form'
import { Stack } from '@mantine/core'

interface MedicalResultFileUploadProps {
  params: { testId: string }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de reporte medico' />
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