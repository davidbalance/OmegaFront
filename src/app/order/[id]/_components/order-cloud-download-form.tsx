'use client'

import { parseForm } from '@/lib/utils/form-parse'
import { Box } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { FormEvent, useState } from 'react'
import { useCloudDownload } from './order-cloud-download.context'
import { blobFile } from '@/lib/utils/blob-to-file'
import dayjs from 'dayjs'

interface OrderCloudDownloadFormProps {
    children: React.ReactNode
}
const OrderCloudDownloadForm: React.FC<OrderCloudDownloadFormProps> = ({ children }) => {

    const { start, end } = useCloudDownload();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value: any = parseForm(event.currentTarget);
        const keys = Object.keys(value);
        if (!keys.length) {
            notifications.show({ message: 'Debe seleccionar al menos un archivo para descargar' })
            return;
        }
        const requestValues = Object.entries(value).map(e => ({ id: e[0], type: e[1] }));
        start();
        try {
            const response = await fetch('/api/medical/file/multiple', {
                method: 'POST',
                body: JSON.stringify({ files: requestValues }),
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
            end();
        }
    }

    return (
        <Box
            component='form'
            flex={1}
            h='100%'
            onSubmit={handleSubmit}>
            {children}
        </Box>
    )
}

export default OrderCloudDownloadForm