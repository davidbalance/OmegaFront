import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { CorporativeGroup } from '@/lib/dtos/location/corporative/base.response.dto'
import { Group, Title } from '@mantine/core'
import React from 'react'

interface CorporativeGroupBodyProps {
    active: number | undefined;
    groups: CorporativeGroup[]
}
const CorporativeGroupBody: React.FC<CorporativeGroupBodyProps> = ({ active, groups }) => {
    return (
        <ListTbody>
            {groups.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='group'
                            removeQueries={['company']}>
                            <Title order={6}>{e.name}</Title>
                        </AddQueryParam>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default CorporativeGroupBody