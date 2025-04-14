'use client'

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

const MassiveLoadButton: React.FC<{ href: string }> = ({
    href
}) => {
    return (
        <Tooltip
            label='Carga Masiva'
            withArrow>
            <ActionIcon
                component={Link}
                href={href}
                size='sm'
                variant='light'>
                <IconUpload />
            </ActionIcon>
        </Tooltip>
    )
}

export default MassiveLoadButton