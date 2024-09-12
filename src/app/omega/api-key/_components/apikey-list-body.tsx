import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { ApiKey } from '@/lib/dtos/auth/api/key/base.response.dto'
import { Group, Title } from '@mantine/core'
import React from 'react'

interface ApikeyListBodyProps {
    apikeys: ApiKey[]
}
const ApikeyListBody: React.FC<ApikeyListBodyProps> = ({
    apikeys
}) => {
    return (
        <ListTbody>
            {apikeys.map((e) => (
                <ListRow hoverable={true} key={e.id}>
                    <Group justify='space-between'>
                        <Title order={6}>{e.name}</Title>
                        {/* <ActionIcon variant='transparent'>
                            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon> */}
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default ApikeyListBody