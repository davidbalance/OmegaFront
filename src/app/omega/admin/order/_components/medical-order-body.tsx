import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalOrderExpanded } from '@/lib/dtos/medical/order/base.response.dto'
import { Group, MenuItem, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import React, { Suspense } from 'react'
import MedicalOrderEmail from '@/components/medical-order-mail/medical-order-email'
import MedicalOrderEmailSuspense from '@/components/medical-order-mail/medical-order-email.suspense'
import MedicalOrderValidateButton from '@/components/medical-order-validate-button'
import ActionMenuProvider from '@/contexts/action-menu.context'
import ActionMenu from '@/components/_base/action-menu'
import { IconEye, IconUpload } from '@tabler/icons-react'
import Link from 'next/link'
import MedicalOrderDownload from '@/components/medical-order-download'

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
                            <ActionMenuProvider>
                                <ActionMenu>
                                    <MenuItem
                                        component={Link}
                                        href={`/omega/medical/order/${e.id}/file/upload`}
                                        leftSection={(
                                            <IconUpload style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Subir archivo
                                    </MenuItem>
                                    {e.hasFile ? <MenuItem
                                        component={Link}
                                        href={`/omega/medical/order/${e.id}/file/view`}
                                        leftSection={(
                                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Visualizar archivo
                                    </MenuItem> : null}
                                    {e.hasFile ? <MedicalOrderDownload {...e} /> : null}
                                </ActionMenu>
                            </ActionMenuProvider>
                        </Group>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default MedicalOrderBody