'use client'

import { MedicalOrderCloudFile } from '@/lib/dtos/medical/order/base.response.dto'
import { blobFile } from '@/lib/utils/blob-to-file'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'

interface OrderDownloadAllPorps {
    files: MedicalOrderCloudFile[]
}
const OrderDownloadAll: React.FC<OrderDownloadAllPorps> = ({ files: baseFiles }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const files = useMemo(() => baseFiles.filter(e => e.hasFile).map(e => ({ id: e.id, type: e.type })), [baseFiles]);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/medical/file/multiple', {
                method: 'POST',
                body: JSON.stringify({ files: files }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.message);
            }
            const blob = await response.blob();
            blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.zip`);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant='filled'
            fullWidth
            size='sm'
            onClick={handleClick}
            loading={loading}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />)}>
            Descargar todo
        </Button>
    )
}

export default OrderDownloadAll