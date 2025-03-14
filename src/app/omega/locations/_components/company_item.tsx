import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import { Company } from '@/server/company/server_types';
import { Stack, Title, Group, Text } from '@mantine/core';
import React from 'react'

type CompanyItemProps = Company & {
    active?: boolean;
    removeQueries?: string[];
}
const CompanyItem: React.FC<CompanyItemProps> = ({
    active,
    companyId,
    companyName,
    companyRuc,
    companyPhone,
    removeQueries = []
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}>
            <AddQueryParam
                value={companyId}
                query='company'
                removeQueries={removeQueries}>
                <Stack>
                    <Title order={6}>{companyName}</Title>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <Text>{companyRuc}</Text>
                        <Text>{companyPhone}</Text>
                    </Group>
                </Stack>
            </AddQueryParam>
        </ListRow>
    )
}

export default CompanyItem