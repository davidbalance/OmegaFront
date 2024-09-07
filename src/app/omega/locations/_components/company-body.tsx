import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import { Company } from '@/lib/dtos/location/company.response.dto'
import { Stack, Title, Group, Text } from '@mantine/core';
import React from 'react'

interface CompanyBodyProps {
    active: number | undefined;
    companies: Company[];
}
const CompanyBody: React.FC<CompanyBodyProps> = ({ active, companies }) => {
    return (
        <ListTbody>
            {companies.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <AddQueryParam
                        value={e.id.toString()}
                        query='company'>
                        <Stack>
                            <Title order={6}>{e.name}</Title>
                            <Group justify='space-between' align='center' wrap='nowrap'>
                                <Text>{e.ruc}</Text>
                                <Text>{e.phone}</Text>
                            </Group>
                        </Stack>
                    </AddQueryParam>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default CompanyBody