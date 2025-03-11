'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { blobFile } from '@/lib/utils/blob-to-file'
import { getErrorMessage } from '@/lib/utils/errors'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconTable } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

const processBlob = async () => {
    const response = await fetch(`/api/medical/result/file/check`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    });
    if (!response.ok) {
        if (response.status === 404) {
            notifications.show({ message: 'Todos los archivos han sido encontrados' })
            return;
        } else {
            const reason = await response.json();
            throw new Error(reason);
        }
    }
    const blob = await response.blob();
    blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.xlsx`)
}

const CommandResultFileCheckExcel: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const handleBlob = async () => {
        setLoading(true);
        try {
            await processBlob();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModularBox pos='relative'>
            <Button
                onClick={handleBlob}
                fullWidth
                variant='light'
                leftSection={
                    <IconTable style={{ width: rem(16), height: rem(16) }} />
                }
                loading={loading}>
                Resultados medicos no encontrados
            </Button>
        </ModularBox>)
}

export default CommandResultFileCheckExcel