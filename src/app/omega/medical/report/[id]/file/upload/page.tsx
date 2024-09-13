import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import FileUploadForm from './_components/file-upload-form'
import { Flex } from '@mantine/core'

interface MedicalResultFileUploadProps {
  params: { id: number }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de resultado medico' />
      <ModularBox
        h='100%'
        flex={1}>
        <Flex
          h='100%'
          justify='center'>
          <FileUploadForm id={params.id} />
        </Flex>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileUpload