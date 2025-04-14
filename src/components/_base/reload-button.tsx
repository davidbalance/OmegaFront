'use client'

import { ActionIcon, Tooltip } from '@mantine/core'
import { IconReload } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ReloadButton: React.FC = () => {

    const router = useRouter();

    return (
        <Tooltip
            label='Recargar'
            withArrow>
            <ActionIcon
                size='sm'
                variant='light'
                onClick={router.refresh}>
                <IconReload />
            </ActionIcon>
        </Tooltip>
    )
}

export default ReloadButton