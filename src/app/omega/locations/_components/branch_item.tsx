import ListRow from '@/components/_base/list/list-row'
import Title from '@/components/_base/mantine/title'
import { Branch } from '@/server/branch/server_types'
import { Stack, rem, Text } from '@mantine/core'
import React from 'react'

type BranchItemProps = Branch;
const BranchItem: React.FC<BranchItemProps> = ({
    branchName,
    cityName
}) => {
    return (
        <ListRow hoverable={true}>
            <Stack gap={rem(8)}>
                <Title order={6}>{branchName}</Title>
                <Text>{cityName}</Text>
            </Stack>
        </ListRow>
    )
}

export default BranchItem