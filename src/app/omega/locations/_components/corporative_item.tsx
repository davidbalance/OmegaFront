import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import { Corporative } from '@/server/corporative/server_types'
import { Group, Title } from '@mantine/core'
import React from 'react'

type CorporativeItemProps = Corporative & {
    active?: boolean;
}
const CorporativeItem: React.FC<CorporativeItemProps> = ({
    active,
    corporativeId,
    corporativeName
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
                    removeQueries={['company']}>
                    <Title order={6}>{corporativeName}</Title>
                </AddQueryParam>
            </Group>
        </ListRow>
    )
}

export default CorporativeItem