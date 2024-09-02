'use client'

import { ActionIcon, MantineSize } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface RemoveQueryButtonProps {
    queries: string | string[];
    hiddenFrom?: (string & {}) | MantineSize | undefined
}
const RemoveQueryButton: React.FC<RemoveQueryButtonProps> = ({
    queries,
    ...props
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();

    const handleClick = () => {
        const newQuery = new URLSearchParams(query.toString());
        if (typeof queries === 'string') {
            newQuery.delete(queries);
        } else {
            for (const query of queries) {
                newQuery.delete(query);
            }
        }
        router.push(`${pathname}?${newQuery.toString()}`);
    }

    return (
        <ActionIcon
            variant='light'
            size='sm'
            onClick={handleClick}{
            ...props}>
            <IconX />
        </ActionIcon>
    )
}

export default RemoveQueryButton