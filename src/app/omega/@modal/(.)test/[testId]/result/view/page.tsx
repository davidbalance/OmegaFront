import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import NotFoundFileCard from '@/components/_base/not-found-file-card';
import { retriveMedicalResultFile } from '@/server/medical_test/actions';
import { ModalHeader, ModalCloseButton, ModalBody, Box, rem } from '@mantine/core';
import React from 'react'

interface ResultModalSlotTestSegmentViewPageProps {
    params: { testId: string }
}
const ResultModalSlotTestSegmentViewPage: React.FC<ResultModalSlotTestSegmentViewPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveMedicalResultFile(params.testId);
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

export default ResultModalSlotTestSegmentViewPage