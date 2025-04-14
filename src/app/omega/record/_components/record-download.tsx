'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { blobFile } from '@/lib/utils/blob-to-file'
import { useActionMenu } from '@/contexts/action-menu.context'
import dayjs from 'dayjs'

const processBlob = async (id: string, record: string) => {
    const response = await fetch(`/api/medical/file/record/${id}`);
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `${record.toLocaleLowerCase().split(' ').join('_')}_${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.pdf`)
}

interface RecordDownloadProps {
    recordId: string,
    recordName: string
}
const RecordDownload: React.FC<RecordDownloadProps> = ({
    recordId,
    recordName
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = processBlob(recordId, recordName);
        trigger(promise);
    }, [recordId, recordName, trigger]);

    return (
        <MenuItem
            onClick={handleClick}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} />
            )}>
            Descargar ficha
        </MenuItem>
    )
}

export default RecordDownload