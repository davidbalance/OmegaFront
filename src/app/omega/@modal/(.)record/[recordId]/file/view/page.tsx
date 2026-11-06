import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import NotFoundFileCard from '@/components/_base/not-found-file-card';
import { retriveClientRecordFile } from '@/server';
import { ModalHeader, ModalCloseButton, ModalBody, Box } from '@mantine/core';
import React from 'react'

interface RecordModalSlotRecordSegmentViewPageProps {
    params: { recordId: string }
}
const RecordModalSlotRecordSegmentViewPage: React.FC<RecordModalSlotRecordSegmentViewPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveClientRecordFile(params.recordId);
    } catch (error) {
        return <NotFoundFileCard />
    }
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return (
        <>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <Box h='100%'>
                    <BlobPreview base64={base64} fileType={blob.type} />
                </Box>
            </ModalBody>
        </>)
}

export default RecordModalSlotRecordSegmentViewPage