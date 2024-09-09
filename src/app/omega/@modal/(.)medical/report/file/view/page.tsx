import BlobPreview from '@/components/_base/blob-preview';
import NotFoundFileCard from '@/components/not-found-file-card';
import { retriveFileBlob } from '@/server/file.actions';
import { ModalHeader, ModalCloseButton, ModalBody, Box, rem } from '@mantine/core';
import React from 'react'

interface ModalMedicalReportFileViewPageProps {
    params: { id: number }
}
const ModalMedicalReportFileViewPage: React.FC<ModalMedicalReportFileViewPageProps> = async ({ params }) => {

    let blob;
    try {
        blob = await retriveFileBlob(Number(params.id), 'report');
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

export default ModalMedicalReportFileViewPage