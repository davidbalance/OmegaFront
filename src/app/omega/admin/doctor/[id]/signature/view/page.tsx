import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import BlobPreview from '@/components/_base/blob-preview/blob-preview'
import { Flex, rem } from '@mantine/core'
import { retriveDoctorFile } from '@/server'

interface DoctorActionSignatureViewPageProps {
  params: { id: string }
}
const DoctorActionSignatureViewPage: React.FC<DoctorActionSignatureViewPageProps> = async ({ params }) => {

  const blob = await retriveDoctorFile(params.id);
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  return (
    <>
      <ReturnableHeader title='Visualización en linea de firma' />
      <ModularBox flex={1}>
        <Flex
          justify='center'
          align='center'
          maw={rem(600)}
          h='100%'>
          <BlobPreview base64={base64} fileType={blob.type} />
        </Flex>
      </ModularBox>
    </>
  )
}

export default DoctorActionSignatureViewPage