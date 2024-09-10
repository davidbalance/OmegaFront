'use client'

import { MedicalOrderCloudFile } from '@/lib/dtos/medical/order/base.response.dto';
import { blobFile } from '@/lib/utils/blob-to-file';
import { ActionIcon, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs';
import React, { useState } from 'react'

interface OrderDownloadSingleProps extends MedicalOrderCloudFile { }
const OrderDownloadSingle: React.FC<OrderDownloadSingleProps> = ({ id, type, examName }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/medical/file/${type}/${id}`, { method: 'GET' });
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.message);
            }
            const blob = await response.blob();
            blobFile(blob, `${examName}.pdf`);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ActionIcon
            onClick={handleClick}
            variant='transparent'
            loading={loading}>
            <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    )
}

export default OrderDownloadSingle