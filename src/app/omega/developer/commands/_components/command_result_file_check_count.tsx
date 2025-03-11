'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { getErrorMessage } from '@/lib/utils/errors'
import { retriveMedicalTestFileCount } from '@/server/medical_test/actions'
import { MedicalFileResult } from '@/server/medical_test/server_types'
import { Box, Button, Flex, rem, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconMath } from '@tabler/icons-react'
import React, { useState } from 'react'

const CommandResultFileCheckCount: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<MedicalFileResult>({
        notFound: 0, found: 0, total: 0
    });

    const handleClick = async () => {
        setLoading(true);
        try {
            const data = await retriveMedicalTestFileCount();
            setCount(data);
        } catch (error: any) {
            console.error(error);
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModularBox pos='relative'>
            <Flex>
                <Box miw={rem(200)}>
                    <Text><Text fw={500} component='span'>Total</Text>: {count.total}</Text>
                    <Text><Text fw={500} component='span'>Found</Text>: {count.found}</Text>
                    <Text><Text fw={500} component='span'>Not Found</Text>: {count.notFound}</Text>
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