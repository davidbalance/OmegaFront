import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import { Corporative } from '@/server/corporative/server-types'
import { Group, Title } from '@mantine/core'
import React from 'react'

type CorporativeItemProps = Corporative & {
    active?: boolean;
    removeQueries?: string[];
}
const CorporativeItem: React.FC<CorporativeItemProps> = ({
    active,
    corporativeId,
    corporativeName,
    removeQueries
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}
            key={corporativeId}>
            <Group justify='space-between' align='center' wrap='nowrap'>
                <AddQueryParam
                    value={corporativeId}
                    query='corporative'
                    removeQueries={removeQueries}>
                    <Title order={6}>{corporativeName}</Title>
                </AddQueryParam>
            </Group>
        </ListRow>
    )
}

export default CorporativeItem