import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import MedicalOrderDownloadButton from '@/components/medical-order-download-button';
import { MedicalOrderDoctor } from '@/lib/dtos/medical/order/base.response.dto';
import { Flex, Title, Group, Text, Stack, rem } from '@mantine/core';
import dayjs from 'dayjs';
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
                  {e.hasFile && <MedicalOrderDownloadButton {...e} />}
                </Group>
              </Group>
            </AddQueryParam>
          </Flex>
        </ListRow>
      ))}
    </ListTbody>)
}

export default MedicalOrderListBody