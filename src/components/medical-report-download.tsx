'use client'

import React from 'react'
import { MenuItem, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { blobFile } from '@/lib/utils/blob-to-file'
import { useActionMenu } from '@/contexts/action-menu.context'

const processBlob = async (id: number, exam: string) => {
    const response = await fetch(`/api/medical/file/report/${id}`);
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `${exam.toLocaleLowerCase().split(' ').join('_')}.pdf`)
}

interface MedicalReportDownloadProps {
    id: number,
    exam: string
}
const MedicalReportDownload: React.FC<MedicalReportDownloadProps> = ({
    id: result,
    exam
}) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = processBlob(result, exam);
        trigger(promise);
    }

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