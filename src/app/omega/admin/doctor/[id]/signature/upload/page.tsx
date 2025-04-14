import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import SignatureUploadForm from './_components/signature_upload_form'
import { Flex, Stack } from '@mantine/core'

interface UploadDoctorSignaturePageProps {
  params: { id: string }
}
const UploadDoctorSignaturePage: React.FC<UploadDoctorSignaturePageProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de firma' />
      <ModularBox flex={1}>
        <Stack h='100%' align='center' justify='center'>
          <SignatureUploadForm userId={params.id} />
        </Stack>
      </ModularBox >
    </>
  )
}

export default UploadDoctorSignaturePage