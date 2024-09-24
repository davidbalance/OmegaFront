import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import FileUploadForm from './_components/file-upload-form'
import { Flex, Stack } from '@mantine/core'

interface MedicalResultFileUploadProps {
  params: { id: number }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de resultado de orden medica' />
      <ModularBox
        h='100%'
        flex={1}>
        <Stack h='100%' justify='center'>
          <FileUploadForm id={params.id} />
        </Stack>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileUpload