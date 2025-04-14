'use client'

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

const CreateButton: React.FC<{ href: string }> = ({
    href
}) => {
    return (
        <Tooltip
            label='Crear'
            withArrow>
            <ActionIcon
                component={Link}
                href={href}
                size='sm'
                variant='light'>
                <IconPlus />
            </ActionIcon>
        </Tooltip>
    )
}

export default CreateButton