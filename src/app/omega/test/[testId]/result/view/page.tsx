import BlobPreview from '@/components/_base/blob-preview/blob-preview'
import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { retriveMedicalResultFile } from '@/server/medical_test/actions'
import { Flex, rem } from '@mantine/core'
import React from 'react'

interface MedicalResultFileViewPageProps {
  params: { testId: string }
}
const MedicalResultFileViewPage: React.FC<MedicalResultFileViewPageProps> = async ({
  params
}) => {

  const blob = await retriveMedicalResultFile(params.testId);
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  return (
    <>
      <ReturnableHeader title='Visualizacion de documento' />
      <ModularBox
        flex={1}>
        <Flex
          justify='center'
          align='center'
          maw={rem(600)}
          w='100%'
          h='100%'>
          <BlobPreview base64={base64} fileType={blob.type} />
        </Flex>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileViewPage