import BlobPreview from '@/components/_base/blob-preview/blob-preview'
import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { retriveFileBlob } from '@/server/file.actions'
import { Flex, rem } from '@mantine/core'
import React from 'react'

interface MedicalResultFileViewPageProps {
  params: { id: number }
}
const MedicalResultFileViewPage: React.FC<MedicalResultFileViewPageProps> = async ({
  params
}) => {

  const blob = await retriveFileBlob(Number(params.id), 'result');
  const buffer = await blob.arrayBuffer();

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
          <BlobPreview buffer={buffer} fileType={blob.type} />
        </Flex>
      </ModularBox>
    </>
  )
}

export default MedicalResultFileViewPage