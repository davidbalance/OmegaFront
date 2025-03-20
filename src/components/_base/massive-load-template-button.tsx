'use client'

import { blobFile } from '@/lib/utils/blob-to-file'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'

const processBlob = async (type: string) => {
    const response = await fetch(`/api/template/massive-load/${type}`, {
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
    blobFile(blob, `template_${type}_${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.xlsx`)
}

type MassiveLoadTemplateButtonProps = {
    type: 'order' | 'patient'
}
const MassiveLoadTemplateButton: React.FC<MassiveLoadTemplateButtonProps> = ({
    type
}) => {

    const [currentStatus, setCurrentStatus] = useState<'default' | 'loading'>('default');

    const handleClick = useCallback(() => {
        setCurrentStatus('loading');
        processBlob(type);
        setCurrentStatus('default');
    }, [type]);

    return (
        <Button
            size="xs"
            variant="light"
            loading={currentStatus === 'loading'}
            onClick={handleClick}
            rightSection={<IconDownload style={{ width: rem(16) }} />}>
            Descargar Plantilla
        </Button>
    )
}

export default MassiveLoadTemplateButton