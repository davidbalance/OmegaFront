import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { MedicalOrderDoctor } from '@/lib/dtos/medical/order/base.response.dto';
import { Flex, Title, Group, Text, Stack, rem, MenuItem } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react'

interface MedicalOrderListBodyProps {
  active?: number;
  orders: MedicalOrderDoctor[];
}
const MedicalOrderListBody: React.FC<MedicalOrderListBodyProps> = ({
  active,
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
              <Group justify='space-between'>
                <Stack gap={rem(8)}>
                  <Title order={6}>{e.process}</Title>
                  <Text>{dayjs(e.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </Stack>
                <Group wrap='nowrap'>
                  {!e.leftReports
                    ? <Text>Reportes completos</Text>
                    : <Text c='red'>Reportes faltantes {e.leftReports}</Text>}
                </Group>
              </Group>
            </AddQueryParam>
          </Flex>
        </ListRow>
      ))}
    </ListTbody>)
}

export default MedicalOrderListBody