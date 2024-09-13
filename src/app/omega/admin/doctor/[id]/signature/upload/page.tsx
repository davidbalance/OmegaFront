import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import FileUploadForm from './_components/file-upload-form'
import { Flex, Stack } from '@mantine/core'

interface DoctorActionSignatureUploadPagePropa {
  params: { id: number }
}
const DoctorActionSignatureUploadPage: React.FC<DoctorActionSignatureUploadPagePropa> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de firma' />
      <ModularBox flex={1}>
        <Stack h='100%' align='center' justify='center'>
          <FileUploadForm id={params.id} />
        </Stack>
      </ModularBox >
    </>
  )
}

export default DoctorActionSignatureUploadPage