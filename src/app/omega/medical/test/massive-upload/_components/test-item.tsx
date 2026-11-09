'use client'

import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, DefaultMantineColor, Flex, Group, Text, Title } from '@mantine/core'
import ListRow from '@/components/_base/list/list-row'
import { UploadItem, useMassiveUpload } from '../_context/massive-upload.context'
import { slugifyFilename } from '../_utils/utils'
import { notifications } from '@mantine/notifications'
import { IconClipboardCopy, IconTrash, IconX } from '@tabler/icons-react'

type TestItemProps = {
    item: UploadItem
}

const FILE_LABELS: Record<UploadItem["status"], {
    color: DefaultMantineColor,
    label: string
}> = {
    'not-assigned': {
        label: 'Archivo no encontrado',
        color: "gray"
    },
    assigned: {
        label: 'Archivo cargado',
        color: "blue"
    },
    ready: {
        label: 'Archivo listo para guardar',
        color: "orange"
    },
    error: {
        label: 'Prueba medica no asociada',
        color: "red"
    }
}

const TestItem: React.FC<TestItemProps> = ({
    item
}) => {

    const { patientName, onRemove } = useMassiveUpload()

    const label = useMemo((): {
        color: DefaultMantineColor,
        label: string
    } => FILE_LABELS[item.status], [item])

    const onClipboard = useCallback(async () => {
        await navigator.clipboard.writeText(slugifyFilename(item.name, patientName))
        notifications.show({ message: "Nombre de archivo copiado al portapapeles" });
    }, [item, patientName])

    const handleRemove = useCallback(() => {
        onRemove(item.name)
    }, [item, onRemove])

    return (
        <ListRow
            hoverable>
            <Flex
                component='div'
                justify='space-between'
                align='center'>
                <Box component='div'>
                    <Title order={6}>{item.name}</Title>
                    <Text size='xs' c={label.color}>{label.label}</Text>
                </Box>
                <Group gap={4}>
                    {
                        item.status === "error" ?
                            <ActionIcon
                                variant='transparent'
                                onClick={handleRemove}>
                                <IconTrash />
                            </ActionIcon> :
                            <ActionIcon
                                variant='transparent'
                                onClick={onClipboard}>
                                <IconClipboardCopy />
                            </ActionIcon>}
                </Group>
            </Flex>
        </ListRow>
    )
}

export default TestItem