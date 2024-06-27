import { ModularBox } from '@/components/modular/box/ModularBox'
import { useFetch } from '@/hooks/useFetch'
import { Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconReport } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react'

const CommandsMedicalReportGenerateAllPdf: React.FC = () => {

    const {
        data,
        error,
        loading,
        reload,
        reset,
    } = useFetch<any>('/api/medical/reports/recreate/pdf', 'GET', { loadOnMount: false });

    const handleClickEvent = useCallback(() => {
        reload();
    }, [reload]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data) {
            reset();
        }
    }, [data, reset]);

    return (
        <ModularBox
            pos='relative'>
            <Button
                fullWidth
                onClick={handleClickEvent}
                size='compact-sm'
                variant='light'
                leftSection={
                    <IconReport style={{ width: rem(16), height: rem(16) }}
                    />
                }
                loading={loading}>
                Generar reportes medicos
            </Button>
        </ModularBox>
    )
}

export { CommandsMedicalReportGenerateAllPdf }