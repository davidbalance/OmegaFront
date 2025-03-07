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

    return (
        <>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <Box h='100%'>
                    <BlobPreview buffer={buffer} fileType={blob.type} />
                </Box>
            </ModalBody>
        </>)
}

export default ResultModalSlotTestSegmentViewPage