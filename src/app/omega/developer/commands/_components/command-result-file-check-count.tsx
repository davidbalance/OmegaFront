'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { retriveMedicalResultFileCheckCount } from '@/server/medical-result.actions'
import { Box, Button, Flex, rem, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconMath, IconTable } from '@tabler/icons-react'
import React, { useState } from 'react'

const CommandResultFileCheckCount: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<{ total: number; match: number, error: number }>({
        error: 0, match: 0, total: 0
    });

    const handleClick = async () => {
        setLoading(true);
        try {
            const data = await retriveMedicalResultFileCheckCount();
            setCount(data);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModularBox pos='relative'>
            <Flex>
                <Box miw={rem(200)}>
                    <Text><Text fw={500} component='span'>Total</Text>: {count.total}</Text>
                    <Text><Text fw={500} component='span'>Match</Text>: {count.match}</Text>
                    <Text><Text fw={500} component='span'>Error</Text>: {count.error}</Text>
                </Box>
                <Button
                    onClick={handleClick}
                    fullWidth
                    variant='light'
                    leftSection={
                        <IconMath style={{ width: rem(16), height: rem(16) }} />
                    }
                    loading={loading}>
                    Contar resultados medicos
                </Button>
            </Flex>
        </ModularBox>)
}

export default CommandResultFileCheckCount