import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import NotFoundFileCard from '@/components/_base/not-found-file-card';
import { retriveFileBlob } from '@/server/file.actions';
import { ModalHeader, ModalCloseButton, ModalBody, Box, rem } from '@mantine/core';
import React from 'react'

export const dynamic = 'force-dynamic'
interface ModalMedicalResultFileViewPageProps {
    params: { id: number }
}
const ModalMedicalResultFileViewPage: React.FC<ModalMedicalResultFileViewPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveFileBlob(Number(params.id), 'result');
    } catch (error) {
        return <NotFoundFileCard />
    }
    blob = await retriveFileBlob(Number(params.id), 'result');
    const buffer = await blob.arrayBuffer();

    return (
        <>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <Box
                    maw={rem(600)}
                    h='100%'>
                    <BlobPreview buffer={buffer} fileType={blob.type} />
                </Box>
            </ModalBody>
        </>)
}

export default ModalMedicalResultFileViewPage