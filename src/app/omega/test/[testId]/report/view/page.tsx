import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import ReturnableHeader from '@/components/_base/returnable-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveMedicalReportFile } from '@/server';
import { Flex, rem } from '@mantine/core';
import React from 'react'

interface MedicalReportFileViewPageProps {
  params: { testId: string }
}
const MedicalReportFileViewPage: React.FC<MedicalReportFileViewPageProps> = async ({
  params
}) => {

  const blob = await retriveMedicalReportFile(params.testId);
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
          w='100%'
          h='100%'>
          <BlobPreview base64={base64} fileType={blob.type} />
        </Flex>
      </ModularBox>
    </>
  )
}

export default MedicalReportFileViewPage