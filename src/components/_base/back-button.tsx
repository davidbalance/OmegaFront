'use client'

import { ActionIcon } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleClick = () => router.back();

    return (
        <ActionIcon
            variant='transparent'
            size='sm'
            onClick={handleClick}>
            <IconChevronLeft />
        </ActionIcon>
    )
}

export default BackButton