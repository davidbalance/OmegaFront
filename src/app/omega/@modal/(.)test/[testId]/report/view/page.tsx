import BlobPreview from '@/components/_base/blob-preview/blob-preview';
import NotFoundFileCard from '@/components/_base/not-found-file-card';
import { retriveMedicalReportFile } from '@/server/medical_test/actions';
import { ModalHeader, ModalCloseButton, ModalBody, Box } from '@mantine/core';
import React from 'react'

interface ResultModalSlotTestSegmentPageProps {
    params: { testId: string }
}
const ResultModalSlotTestSegmentPage: React.FC<ResultModalSlotTestSegmentPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveMedicalReportFile(params.testId);
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

export default ResultModalSlotTestSegmentPage