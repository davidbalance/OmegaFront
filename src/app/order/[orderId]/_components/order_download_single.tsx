'use client'

import { blobFile } from '@/lib/utils/blob-to-file';
import { getErrorMessage } from '@/lib/utils/errors';
import { MedicalFileZipPayload } from '@/server/medical_test/server_types';
import { ActionIcon, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs';
import React, { useState } from 'react'

type OrderFileValue = {
    testId: string;
    type: 'report' | 'result';
    examName: string;
};

const processBlob = async (value: OrderFileValue): Promise<void> => {
    const response = await fetch(`/api/medical/file/${value.type}/${value.testId}`, { method: 'GET' });
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }
    const blob = await response.blob();
    blobFile(blob, `${value.examName}.pdf`);
}

type OrderDownloadSingleProps = OrderFileValue;
const OrderDownloadSingle: React.FC<OrderDownloadSingleProps> = ({
    testId,
    examName,
    type
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await processBlob({ testId, type, examName });
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
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