'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React from 'react'
import { blobFile } from '@/lib/utils/blob-to-file'
import { useActionUser } from '@/contexts/action-user.context'

const processBlob = async (id: number, exam: string) => {
    const response = await fetch(`/api/medical/file/result/${id}`);
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `${exam.toLocaleLowerCase().split(' ').join('_')}.pdf`)
}

interface MedicalResultDownloadProps {
    id: number,
    exam: string
}
const MedicalResultDownload: React.FC<MedicalResultDownloadProps> = ({
    id: result,
    exam
}) => {

    const { trigger } = useActionUser();

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
            Descargar resultado
        </MenuItem>
    )
}

export default MedicalResultDownload