'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { blobFile } from '@/lib/utils/blob-to-file';
import { parseForm } from '@/lib/utils/form-parse';
import { Box, Button, rem, SimpleGrid } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconFileSpreadsheet } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const processBlob = async (body: 'any') => {
    const response = await fetch(`/api/medical/disease/report`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' }
    });
    if (!response.ok) {
        const reason = await response.json();
        throw new Error(reason);
    }
    const blob = await response.blob();
    blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.xlsx`)
}


interface DiseaseReportFormProps {
    children: React.ReactNode
}
const DiseaseReportForm: React.FC<DiseaseReportFormProps> = ({
    children
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            await processBlob(values);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModularBox>
            <LoadingOverlay visible={loading} />
            <Box
                onSubmit={handleSubmit}
                component='form'>
                <SimpleGrid
                    cols={3}
                    spacing={rem(8)}>
                    {children}
                </SimpleGrid>
                <Button
                    mt='sm'
                    type='submit'
                    fullWidth
                    size='xs'
                    leftSection={(
                        <IconFileSpreadsheet style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Exportar
                </Button>
            </Box>
        </ModularBox>
    )
}

export default DiseaseReportForm