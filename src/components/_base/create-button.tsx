'use client'

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

interface CreateButtonProps {
    route: string
}
const CreateButton: React.FC<CreateButtonProps> = ({
    route
}) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(route);
    }, [router, route]);

    return (
        <Tooltip
            label='Crear'
            withArrow>
            <ActionIcon
                size='sm'
                variant='light'
                onClick={handleClick}>
                <IconPlus />
            </ActionIcon>
        </Tooltip>
    )
}

export default CreateButton