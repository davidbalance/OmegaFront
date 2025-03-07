'use client'

import { Modal, Button, Text, Stack } from '@mantine/core'
import { IconClipboard } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { useApiKey } from '../_context/api_key.context'
import { useClipboard } from '@mantine/hooks'

const ApiKeyModal: React.FC = () => {

    const { value, clear } = useApiKey();
    const { copy } = useClipboard();

    const handleCopy = useCallback(() => {
        copy(value);
        clear();
    }, [value, copy, clear]);

    return (
        <Modal
            opened={!!value}
            onClose={clear}
            title={<Text fw={500}>El api key sera mostrado solo una vez</Text>}>
            <Stack align='start'>
                <Text>{value}</Text>
                <Button
                    variant='transparent'
                    onClick={handleCopy}
                    leftSection={<IconClipboard />}>Copiar</Button>
            </Stack>
        </Modal>
    )
}

export default ApiKeyModal