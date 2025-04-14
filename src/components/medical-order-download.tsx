'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React from 'react'
import { blobFile } from '@/lib/utils/blob-to-file'
import { useActionMenu } from '@/contexts/action-menu.context'

const processBlob = async (id: number) => {
    const response = await fetch(`/api/medical/file/order/${id}`);
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `medical_order_${id.toString().padStart(9, '0')}.pdf`)
}

interface MedicalOrderDownloadProps {
    id: number
}
const MedicalOrderDownload: React.FC<MedicalOrderDownloadProps> = ({
    id: result,
}) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = processBlob(result);
        trigger(promise);
    }

    return (
        <MenuItem
            onClick={handleClick}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} />
            )}>
            Descargar archivo
        </MenuItem>
    )
}

export default MedicalOrderDownload