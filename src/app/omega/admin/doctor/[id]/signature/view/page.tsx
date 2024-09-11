import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import BlobPreview from '@/components/_base/blob-preview/blob-preview'
import { Box, rem } from '@mantine/core'
import { retriveBlobSignature } from '@/server/doctor.actions'

export const dynamic = 'force-dynamic'
interface DoctorActionSignatureViewPageProps {
  params: { id: number }
}
const DoctorActionSignatureViewPage: React.FC<DoctorActionSignatureViewPageProps> = async ({ params }) => {

  const blob = await retriveBlobSignature(params.id);
  const buffer = await blob.arrayBuffer();

  return (
    <>
      <ReturnableHeader title='Visualización en linea de firma' />
      <ModularBox
        flex={1}
        justify='center'
        align='center'>
        <Box
          maw={rem(600)}
          h='100%'>
          <BlobPreview buffer={buffer} fileType={blob.type} />
        </Box>
      </ModularBox>
    </>
  )
}

export default DoctorActionSignatureViewPage