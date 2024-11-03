'use client'

import { blobFile } from '@/lib/utils/blob-to-file'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'

const processBlob = async (code: string) => {
    const response = await fetch(`/api/medical/file/tree/${code}`, { method: 'GET' });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new Error('Ha ocurrido un error al descargar el archivo');
    }
    const blob = await response.blob();
    blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.zip`)
}

interface DownloadZipProps {
    code: string
}
const DownloadZip: React.FC<DownloadZipProps> = ({
    code
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleDownload = useCallback(async () => {
        setLoading(true);
        try {
            await processBlob(code);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [code]);

    return (
        <Button
            fullWidth
            size='sm'
            loading={loading}
            onClick={handleDownload}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            )
            }>
            Descargar
        </Button >
    )
}

export default DownloadZip