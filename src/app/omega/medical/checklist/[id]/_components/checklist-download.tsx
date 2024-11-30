'use client'

import { useFileDownload } from '@/hooks/useFileDownload'
import { ActionIcon, rem, Tooltip } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React from 'react'

interface ChecklistDownloadProps {
    id: number;
}
const ChecklistDownload: React.FC<ChecklistDownloadProps> = ({
    id
}) => {

    const { loading, trigger } = useFileDownload(`/api/medical/checklist/${id}`);

    return (
        <Tooltip
            label='Descargar'
            position="right"
            withArrow>
            <ActionIcon
                loading={loading}
                onClick={() => trigger(`checklist_${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.pdf`)}
                pos='absolute'
                bottom={rem(12)}
                right={rem(12)}
                variant="filled"
                size="lg"
                radius="xl"
                aria-label="download"
                style={{ zIndex: 1000 }}>
                <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    )
}

export default ChecklistDownload