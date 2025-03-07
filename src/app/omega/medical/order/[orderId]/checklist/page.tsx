import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, Group, rem, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'
import ChecklistItem from './_components/test_checklist_item';
import ChecklistDownload from './_components/checklist-download';
import { retriveMedicalChecklist } from '@/server/medical_order/actions';

interface MedicalChecklistPageProps {
  params: { orderId: string }
}
const MedicalChecklistPage: React.FC<MedicalChecklistPageProps> = async ({
  params
}) => {

  const checklist = await retriveMedicalChecklist(params.orderId);

  if (!checklist || !checklist.length) {
    return (
      <>
        <ReturnableHeader title='Checklist' />
        <ModularBox>
          <Text ta='center' c='orange' fw='bold'>Datos no encontrados</Text>
        </ModularBox>
      </>
    )
  }

  const orderData = checklist[0];

  return (
    <>
      <ReturnableHeader title='Checklist' />
      <Box
        flex={1}
        pos='relative'>
        <ScrollArea
          pos='absolute'
          top={0}
          bottom={0}
          left={0}
          right={0}
          scrollbars='y'>
          <Stack h='100%' gap={rem(8)}>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(8)}>
              <ModularBox>
                <Stack h='100%' pl={rem(16)} py={rem(8)} justify='center'>
                  <Group>
                    <Text size='lg' fw='bold'>Fecha de ingreso:</Text>
                    <Text size='lg'>{dayjs(orderData.orderEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Cargo:</Text>
                    <Text size='lg'>{orderData.locationJobPosition ?? ''}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Tipo:</Text>
                    <Text size='lg'>{orderData.orderProcess}</Text>
                  </Group>
                </Stack>
              </ModularBox>
              <ModularBox>
                <Stack h='100%' pl={rem(16)} py={rem(8)} justify='center'>
                  <Group>
                    <Text size='lg' fw='bold'>Paciente:</Text>
                    <Text size='lg'>{orderData.patientName} {orderData.patientLastname}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Cedula:</Text>
                    <Text size='lg'>{orderData.patientDni}</Text>
                  </Group>
                </Stack>
              </ModularBox>
              <ModularBox>
                <Stack h='100%' pl={rem(16)} py={rem(8)} justify='center'>
                  <Group>
                    <Text size='lg' fw='bold'>Empresa:</Text>
                    <Box>
                      <Text size='lg'>{orderData.locationCompanyName}</Text>
                      <Text size='sm'>{orderData.locationCompanyRuc}</Text>
                    </Box>
                  </Group>
                </Stack>
              </ModularBox>
            </SimpleGrid>
            <ModularBox
              flex={1}
              pos='relative'>
              <Stack>
                {checklist.map(e => <ChecklistItem
                  key={e.testId}
                  testId={e.testId}
                  check={e.testCheck}
                  examName={e.examName}
                />)}
              </Stack>
            </ModularBox>
          </Stack>
        </ScrollArea>
      </Box>
      <ChecklistDownload orderId={orderData.orderId} />
    </>
  )
}

export default MedicalChecklistPage