import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import FileUploadForm from './_components/file-upload-form'
import { Stack } from '@mantine/core'

interface MedicalReportFileUploadProps {
  params: { id: number }
}
const MedicalReportFileUpload: React.FC<MedicalReportFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de resultado medico' />
      <ModularBox flex={1}>
        <Stack h='100%' justify='center'>
          <FileUploadForm id={params.id} />
        </Stack>
      </ModularBox>
    </>
  )
}

export default MedicalReportFileUpload