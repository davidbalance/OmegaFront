import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import { ExamType } from '@/server/exam-type/server-types'
import { Group, Title } from '@mantine/core'
import React from 'react'

type ExamTypeItemProps = ExamType & {
    active?: boolean;
    removeQueries?: string[];
}

const ExamTypeItem: React.FC<ExamTypeItemProps> = ({
    active,
    typeId,
    typeName,
    removeQueries = []
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}
            key={typeId}>
            <Group justify='space-between' align='center' wrap='nowrap'>
                <AddQueryParam
                    value={typeId}
                    query='type'
                    removeQueries={removeQueries}>
                    <Title order={6}>{typeName}</Title>
                </AddQueryParam>
            </Group>
        </ListRow>)
}

export default ExamTypeItem