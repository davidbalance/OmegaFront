import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import { retriveDoctorFile } from '@/server';
import { Box, ModalBody, ModalCloseButton, ModalHeader, rem } from '@mantine/core';
import React from 'react'

interface DoctorModalActionSignatureViewPageProps {
    params: { id: string }
}
const DoctorModalActionSignatureViewPage: React.FC<DoctorModalActionSignatureViewPageProps> = async ({ params }) => {

    const blob = await retriveDoctorFile(params.id);
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return (
        <>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <Box
                    maw={rem(600)}
                    h='100%'>
                    <BlobPreview base64={base64} fileType={blob.type} />
                </Box>
            </ModalBody>
        </>
    )
}

export default DoctorModalActionSignatureViewPage