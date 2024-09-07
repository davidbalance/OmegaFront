import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Branch } from '@/lib/dtos/location/branch.response.dto'
import { Stack, rem, Title, Text } from '@mantine/core'
import React from 'react'

interface BranchBodyProps {
    branches: Branch[]
}
const BranchBody: React.FC<BranchBodyProps> = ({ branches }) => {
    return (
        <ListTbody>
            {branches.map(e => (
                <ListRow
                    hoverable={true}
                    key={e.id}>
                    <Stack gap={rem(8)}>
                        <Title order={6}>{e.name}</Title>
                        <Text>{e.city}</Text>
                    </Stack>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default BranchBody