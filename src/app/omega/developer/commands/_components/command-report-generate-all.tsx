'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { useConfirmation } from '@/contexts/confirmation.context'
import { generateAllMedicalReport } from '@/server/medical-report.actions'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconReport } from '@tabler/icons-react'
import React, { useState } from 'react'

const CommandReportGenerateAll: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const { show } = useConfirmation();

    const handleClick = async () => {
        const state = await show(`Se van a generar todos los reportes medicos. ¿Esta seguro?`);
        if (state) {
            setLoading(true);
            try {
                await generateAllMedicalReport();
            } catch (error: any) {
                notifications.show({ message: error.message, color: 'red' });
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <ModularBox
            pos='relative'>
            <Button
                fullWidth
                onClick={handleClick}
                size='sm'
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

export default CommandReportGenerateAll