import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import { MedicalOrderDoctor } from '@/server/medical-order/server-types';
import { Flex, Title, Group, Text, Stack, rem } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'

type OrderDoctorItemProps = MedicalOrderDoctor & {
  active?: boolean;
  removeQueries?: string[];
}
const OrderDoctorItem: React.FC<OrderDoctorItemProps> = ({
  orderId,
  orderProcess,
  orderEmissionDate,
  orderLeftReport,
  active,
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
          <Group justify='space-between'>
            <Stack gap={rem(8)}>
              <Title order={6}>{orderProcess}</Title>
              <Text>{dayjs(orderEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </Stack>
            <Group wrap='nowrap'>
              {!orderLeftReport
                ? <Text>Reportes completos</Text>
                : <Text c='red'>Reportes faltantes {orderLeftReport}</Text>}
            </Group>
          </Group>
        </AddQueryParam>
      </Flex>
    </ListRow>)
}

export default OrderDoctorItem