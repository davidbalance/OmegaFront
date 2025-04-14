import React from 'react'
import ListRow from './list-row'
import { Flex, Stack, rem, Skeleton } from '@mantine/core'

const ListRowSuspense: React.FC = () => {
    return (
        <ListRow hoverable={true}>
            <Flex justify='space-between'>
                <Stack gap={rem(8)}>
                    <Skeleton width={rem(150)} height={rem(15)} />
                    <Skeleton width={rem(100)} height={rem(15)} />
                </Stack>
                <Skeleton circle height={rem(30)} />
            </Flex>
        </ListRow>
    )
}

export default ListRowSuspense