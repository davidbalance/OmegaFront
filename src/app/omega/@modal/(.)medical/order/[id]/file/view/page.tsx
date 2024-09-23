import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import NotFoundFileCard from '@/components/_base/not-found-file-card';
import { retriveFileBlob } from '@/server/file.actions';
import { ModalHeader, ModalCloseButton, ModalBody, Box, rem } from '@mantine/core';
import React from 'react'

export const dynamic = 'force-dynamic'
interface ModalMedicalOrderFileViewPageProps {
    params: { id: number }
}
const ModalMedicalOrderFileViewPage: React.FC<ModalMedicalOrderFileViewPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveFileBlob(Number(params.id), 'order');
    } catch (error) {
        return <NotFoundFileCard />
    }
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

export default ModalMedicalOrderFileViewPage