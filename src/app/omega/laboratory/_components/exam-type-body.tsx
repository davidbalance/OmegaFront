import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { Group, Title } from '@mantine/core'
import React from 'react'

interface ExamTypeBodyProps {
    active: number | undefined;
    types: ExamType[];
}

const ExamTypeBody: React.FC<ExamTypeBodyProps> = ({
    active,
    types
}) => {
    return (
        <ListTbody>
            {types.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='type'
                            removeQueries={['subtype']}>
                            <Title order={6}>{e.name}</Title>
                        </AddQueryParam>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>)
}

export default ExamTypeBody