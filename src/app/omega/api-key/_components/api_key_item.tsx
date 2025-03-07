import ListRow from '@/components/_base/list/list-row'
import Title from '@/components/_base/mantine/title';
import { ApiKey } from '@/server/apikey/server_types'
import { Group } from '@mantine/core'
import React from 'react'

type ApiKeyItemProps = ApiKey;
const ApiKeyItem: React.FC<ApiKeyItemProps> = ({
    apiKeyId,
    apiKeyName
}) => {
    return (
        <ListRow
            hoverable={true}
            key={apiKeyId}>
            <Group justify='space-between'>
                <Title order={6}>{apiKeyName}</Title>
            </Group>
        </ListRow>
    )
}

export default ApiKeyItem