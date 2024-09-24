import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalOrderExpanded } from '@/lib/dtos/medical/order/base.response.dto'
import { Group, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import React, { Suspense } from 'react'
import MedicalOrderEmail from '@/components/medical-order-mail/medical-order-email'
import MedicalOrderEmailSuspense from '@/components/medical-order-mail/medical-order-email.suspense'
import MedicalOrderValidateButton from '@/components/medical-order-validate-button'

interface MedicalOrderBodyProps {
    active: number | undefined;
    medicalOrders: MedicalOrderExpanded[];
}
const MedicalOrderBody: React.FC<MedicalOrderBodyProps> = async ({
    active,
    medicalOrders
}) => {

    return (
        <ListTbody>
            {medicalOrders.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='medicalOrder'>
                            <Stack gap={rem(16)}>
                                <SimpleGrid cols={2}>
                                    <Stack gap={rem(8)}>
                                        <Title order={6}>{`${e.name} ${e.lastname}`}</Title>
                                        <Text>{e.dni}</Text>
                                    </Stack>
                                    <Stack gap={rem(8)}>
                                        <Title order={6}>{e.companyName}</Title>
                                        <Text>{e.companyRuc}</Text>
                                    </Stack>
                                </SimpleGrid>
                                <Group>
                                    <Title order={6}>{e.process}</Title>
                                    <Text>{dayjs(e.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                </Group>
                            </Stack>
                        </AddQueryParam>
                        <Group wrap='nowrap'>
                            <Suspense fallback={<MedicalOrderEmailSuspense />}>
                                <MedicalOrderEmail
                                    order={e.id}
                                    status={e.mailStatus}
                                    dni={e.dni} />
                            </Suspense>
                            <MedicalOrderValidateButton
                                id={e.id}
                                orderStatus={e.orderStatus} />
                        </Group>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default MedicalOrderBody