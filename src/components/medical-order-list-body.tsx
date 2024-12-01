import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto'
import { Flex, Title, Text, Group, MenuItem, rem } from '@mantine/core'
import React from 'react'
import dayjs from 'dayjs'
import AddQueryParam from './_base/add-query-param'
import MedicalOrderValidateButton from './medical-order-validate-button'
import MedicalOrderEmail from './medical-order-mail/medical-order-email'
import Link from 'next/link'
import { IconChecklist } from '@tabler/icons-react'
import ActionMenu from './_base/action-menu'
import ActionMenuProvider from '@/contexts/action-menu.context'

interface MedicalOrderListBodyProps {
    active?: number;
    action?: boolean;
    dni?: string;
    orders: MedicalOrder[];
}
const MedicalOrderListBody: React.FC<MedicalOrderListBodyProps> = ({
    active,
    dni,
    action,
    orders
}) => {
    return (
        <ListTbody>
            {orders.map((e) => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Flex justify='space-between' align='center'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='medicalOrder'>
                            <Title order={6}>{e.process}</Title>
                            <Text>{dayjs(e.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </AddQueryParam>
                        <Group wrap='nowrap'>
                            {action ? (
                                <>
                                    {dni
                                        ? <MedicalOrderEmail
                                            order={e.id}
                                            status={e.mailStatus}
                                            dni={dni} /> : null}
                                    <MedicalOrderValidateButton {...e} />
                                </>
                            ) : null}
                            <ActionMenuProvider>
                                <ActionMenu>
                                    <MenuItem
                                        component={Link}
                                        href={`/omega/medical/checklist/${e.id}`}
                                        leftSection={(
                                            <IconChecklist style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Checklist
                                    </MenuItem>
                                </ActionMenu>
                            </ActionMenuProvider>

                        </Group>
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default MedicalOrderListBody