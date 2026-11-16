'use client'

import { useFileDownload } from '@/hooks/useFileDownload'
import { ActionIcon, rem, Tooltip } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React, { useMemo } from 'react'

interface ChecklistDownloadProps {
    patientName: string;
    patientLastname: string;
    patientDni: string;
    orderId: string;
}
const ChecklistDownload: React.FC<ChecklistDownloadProps> = ({
    patientName,
    patientLastname,
    patientDni,
    orderId
}) => {

    const { loading, trigger } = useFileDownload(`/api/medical/checklist/${orderId}`);
    const filenameRoot = useMemo(() => `${patientLastname} ${patientName} ${patientDni}`
    .trim()
    .replace(/ +/g, "_"), 
    [patientName, patientLastname, patientDni])

    return (
        <Tooltip
            label='Descargar'
            position="right"
            withArrow>
            <ActionIcon
                loading={loading}
                onClick={() => trigger(`${filenameRoot}.pdf`)}
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