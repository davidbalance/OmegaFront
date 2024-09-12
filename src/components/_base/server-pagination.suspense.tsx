import { Flex, Group, rem, Skeleton } from '@mantine/core';
import React from 'react'

const ServerPaginationSuspense: React.FC = () => {

    return (
        <Flex justify='center'>
            <Group gap={rem(4)}>
                {[...Array(4)].map(e => <Skeleton key={Math.random()} h="lg" w="lg" circle />)}
            </Group>
        </Flex>
    )
}

export default ServerPaginationSuspense