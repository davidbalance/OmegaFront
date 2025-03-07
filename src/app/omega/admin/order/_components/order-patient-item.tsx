import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import { Group, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { MedicalOrderPatient } from '@/server/medical_order/server_types'
import OrderChangeStatus from '@/components/order_change_status'
import OrderEmailButton from '@/components/medical-order-mail/order_email_button'

type OrderPatientItem = MedicalOrderPatient & {
    active: string | undefined;
}
const OrderPatientItem: React.FC<OrderPatientItem> = async ({
    active,
    orderId,
    orderProcess,
    orderEmissionDate,
    orderStatus,
    orderMail,
    patientName,
    patientLastname,
    patientDni,
    locationCompanyRuc,
    locationCompanyName
}) => {

    return (
        <ListRow
            active={active === orderId}
            hoverable={true}
            key={orderId}>
            <Group
                justify='space-between'
                align='center'
                wrap='nowrap'>
                <AddQueryParam
                    value={orderId}
                    query='medicalOrder'>
                    <Stack
                        gap={rem(16)}>
                        <SimpleGrid
                            cols={2}>
                            <Stack
                                gap={rem(8)}>
                                <Title
                                    order={6}>
                                    {`${patientName} ${patientLastname}`}
                                </Title>
                                <Text>{patientDni}</Text>
                            </Stack>
                            <Stack
                                gap={rem(8)}>
                                <Title
                                    order={6}>
                                    {locationCompanyName}
                                </Title>
                                <Text>
                                    {locationCompanyRuc}
                                </Text>
                            </Stack>
                        </SimpleGrid>
                        <Group>
                            <Title
                                order={6}>
                                {orderProcess}
                            </Title>
                            <Text>
                                {dayjs(orderEmissionDate).format('YYYY-MM-DD HH:mm:ss')}
                            </Text>
                        </Group>
                    </Stack>
                </AddQueryParam>
                <Group wrap='nowrap'>
                    <OrderEmailButton
                        orderId={orderId}
                        orderMail={orderMail}
                        patientDni={patientDni} />
                    <OrderChangeStatus
                        orderId={orderId}
                        orderStatus={orderStatus} />
                </Group>
            </Group>
        </ListRow>
    )
}

export default OrderPatientItem