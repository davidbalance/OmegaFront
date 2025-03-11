'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { getErrorMessage } from '@/lib/utils/errors'
import { checkMedicalTestFile } from '@/server/medical_test/actions'
import { Box, Button, Flex, rem, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconMath } from '@tabler/icons-react'
import React, { useState } from 'react'

const CommandResultFileCheckProcess: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await checkMedicalTestFile();
        } catch (error: any) {
            console.error(error);
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModularBox pos='relative'>
            <Button
                onClick={handleClick}
                fullWidth
                variant='light'
                leftSection={
                    <IconMath style={{ width: rem(16), height: rem(16) }} />
                }
                loading={loading}>
                Procesar resultados medicos
            </Button>
        </ModularBox>)
}

export default CommandResultFileCheckProcess