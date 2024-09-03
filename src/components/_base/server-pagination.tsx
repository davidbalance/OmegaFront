'use client'

import { Flex, Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface ServerPaginationProps {
    queryKey?: string;
    page: number;
    total: number;
}

const ServerPagination: React.FC<ServerPaginationProps> = ({
    queryKey = 'page',
    page,
    total
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();

    const handleChange = (value: number) => {
        const newQuery = new URLSearchParams(query.toString());
        newQuery.set(queryKey, value.toString());
        router.push(`${pathname}?${newQuery.toString()}`);
    }

    return (
        <Flex justify='center'>
            <Pagination
                value={page}
                total={total}
                onChange={handleChange}
                radius='xl'
                size='sm' />
        </Flex>
    )
}

export default ServerPagination