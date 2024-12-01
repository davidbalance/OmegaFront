import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveChecklist } from '@/server/checklist.actions';
import { ActionIcon, Box, Checkbox, Flex, Group, rem, ScrollArea, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'
import ChecklistItem from './_components/checklist-item';
import { IconDownload } from '@tabler/icons-react';
import ChecklistDownload from './_components/checklist-download';

interface MedicalChecklistPageProps {
  params: { id: number }
}
const MedicalChecklistPage: React.FC<MedicalChecklistPageProps> = async ({
  params
}) => {

  let checklist = null;

  try {
    checklist = await retriveChecklist(params.id);
  } catch (error) {
    console.error(error);
  }

  if (!checklist) {
    return (
      <>
        <ReturnableHeader title='Checklist' />
        <ModularBox>
          <Text ta='center' c='orange' fw='bold'>Datos no encontrados</Text>
        </ModularBox>
      </>
    )
  }

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
                    <Text size='lg'>{dayjs(checklist.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Cargo:</Text>
                    <Text size='lg'>{checklist.jobPosition}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Tipo:</Text>
                    <Text size='lg'>{checklist.process}</Text>
                  </Group>
                </Stack>
              </ModularBox>
              <ModularBox>
                <Stack h='100%' pl={rem(16)} py={rem(8)} justify='center'>
                  <Group>
                    <Text size='lg' fw='bold'>Paciente:</Text>
                    <Text size='lg'>{checklist.clientName} {checklist.clientLastname}</Text>
                  </Group>
                  <Group>
                    <Text size='lg' fw='bold'>Cedula:</Text>
                    <Text size='lg'>{checklist.clientDni}</Text>
                  </Group>
                </Stack>
              </ModularBox>
              <ModularBox>
                <Stack h='100%' pl={rem(16)} py={rem(8)} justify='center'>
                  <Group>
                    <Text size='lg' fw='bold'>Empresa:</Text>
                    <Box>
                      <Text size='lg'>{checklist.companyName}</Text>
                      <Text size='sm'>{checklist.companyRuc}</Text>
                    </Box>
                  </Group>
                </Stack>
              </ModularBox>
            </SimpleGrid>
            <ModularBox
              flex={1}
              pos='relative'>
              <Stack>
                {checklist.exams.map(e => <ChecklistItem
                  key={e.id}
                  id={e.id}
                  initial={e.checklistStatus}
                  label={e.examName}
                />)}
              </Stack>
            </ModularBox>
          </Stack>
        </ScrollArea>
      </Box>
      <ChecklistDownload id={params.id} />
    </>
  )
}

export default MedicalChecklistPage