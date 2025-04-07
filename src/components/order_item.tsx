import ListRow from '@/components/_base/list/list-row'
import { Flex, Title, Text, Group, MenuItem, rem } from '@mantine/core'
import React from 'react'
import dayjs from 'dayjs'
import AddQueryParam from './_base/add-query-param'
import Link from 'next/link'
import { IconChecklist } from '@tabler/icons-react'
import ActionMenu from './_base/action-menu'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { MedicalOrder } from '@/server/medical_order/server_types'
import OrderChangeStatus from './order_change_status'
import OrderEmailButton from './medical-order-mail/order_email_button'
import OrderRemoveMenuItem from './order-remove-menu-item'

type OrderItemProps = MedicalOrder & {
    patientDni: string;
    active?: boolean;
    action?: boolean;
    checklist?: boolean;
    remove?: boolean;
    removeQueries?: string[];
}
const OrderItem: React.FC<OrderItemProps> = ({
    orderId,
    orderProcess,
    orderEmissionDate,
    orderStatus,
    orderMail,
    patientDni,
    active,
    action,
    checklist,
    remove,
    removeQueries = []
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}>
            <Flex
                component='div'
                justify='space-between'
                align='center'>
                <AddQueryParam
                    value={orderId}
                    query='medicalOrder'
                    removeQueries={removeQueries}>
                    <Title order={6}>{orderProcess}</Title>
                    <Text>{dayjs(orderEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </AddQueryParam>
                {(checklist || remove || action) ? (
                    <Group
                        component='div'
                        wrap='nowrap'>
                        {action && <>
                            <OrderEmailButton
                                orderId={orderId}
                                orderMail={orderMail}
                                patientDni={patientDni} />
                            <OrderChangeStatus
                                orderId={orderId}
                                orderStatus={orderStatus} />
                        </>}
                        {(checklist || (orderStatus !== 'validated' && remove)) && <ActionMenuProvider>
                            <ActionMenu>
                                {checklist && <MenuItem
                                    component={Link}
                                    href={`/omega/medical/order/${orderId}/checklist`}
                                    leftSection={(
                                        <IconChecklist style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Checklist
                                </MenuItem>}
                                {(orderStatus !== 'validated' && remove) && <OrderRemoveMenuItem query='medicalOrder' orderId={orderId} />}
                            </ActionMenu>
                        </ActionMenuProvider>}
                    </Group>
                ) : null}
            </Flex>
        </ListRow>
    )
}

export default OrderItem