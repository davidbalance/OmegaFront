'use client'

import React, { useCallback } from 'react'
import { MenuItem, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { blobFile } from '@/lib/utils/blob-to-file'
import { useActionMenu } from '@/contexts/action-menu.context'

const processBlob = async (testId: string, exam: string) => {
    const response = await fetch(`/api/medical/file/report/${testId}`);
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `${exam.toLocaleLowerCase().split(' ').join('_')}.pdf`)
}

interface MedicalReportDownloadProps {
    testId: string,
    examName: string
}
const MedicalReportDownload: React.FC<MedicalReportDownloadProps> = ({
    testId,
    examName
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = processBlob(testId, examName);
        trigger(promise);
    }, [trigger, testId, examName])

    return (
        <MenuItem
            onClick={handleClick}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} />
            )}>
            Descargar reporte
        </MenuItem>
    )
}

export default MedicalReportDownload