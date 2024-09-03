import { retriveBlob } from '@/app/omega/admin/patient/_actions/file.actions';
import BlobPreview from '@/components/_base/blob-preview';
import { ModalHeader, ModalCloseButton, ModalBody, Box, rem } from '@mantine/core';
import React from 'react'

interface ModalMedicalReportFileViewPageProps {
    params: { id: number }
}
const ModalMedicalReportFileViewPage: React.FC<ModalMedicalReportFileViewPageProps> = async ({ params }) => {

    const blob = await retriveBlob(Number(params.id), 'report');
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