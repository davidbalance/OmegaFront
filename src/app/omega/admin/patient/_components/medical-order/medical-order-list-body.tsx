import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto'
import { Flex, Title, Text, Group } from '@mantine/core'
import React from 'react'
import dayjs from 'dayjs'
import AddQueryParam from '../add-query-param'
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto'
import MedicalOrderMailButton from './medical-order-mail-button'
import MedicalOrderValidateButton from './medical-order-validate-button'

interface MedicalOrderListBodyProps {
    active?: number;
    email: MedicalClientEmail[];
    orders: MedicalOrder[];
}
const MedicalOrderListBody: React.FC<MedicalOrderListBodyProps> = ({
    active,
    orders,
    email
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
                            queryKey='medicalOrder'>
                            <Title order={6}>{e.process}</Title>
                            <Text>{dayjs(e.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </AddQueryParam>
                        <Group>
                            <MedicalOrderMailButton email={email} {...e} />
                            <MedicalOrderValidateButton {...e} />
                        </Group>
                    </Flex>
                </ListRow >
            ))}
        </ListTbody >
    )
}

export default MedicalOrderListBody