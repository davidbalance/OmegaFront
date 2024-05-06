import { Box, Collapse, LoadingOverlay, Paper, ScrollArea, rem, Text, Flex, Grid, UnstyledButton, Modal, Tabs } from '@mantine/core'
import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { PatientCollapseButton } from './patient-collapse-button/PatientCollapseButton';
import { useMedicalOrder } from '@/hooks/useMedicalOrder';
import dayjs from 'dayjs';
import MedicalResultAssignDisease from '@/components/medical-result/medical-result-assign-disease/MedicalResultAssignDisease';

type PatientCollapsableRowProps = {
  dni: string;
  entries: React.ReactElement[],
}

const PatientCollapsableRow: React.FC<PatientCollapsableRowProps> = ({ entries, dni }) => {
  const medicalOrderHook = useMedicalOrder();

  const [opened, OpenDisclosure] = useDisclosure(false);
  const [modalStatus, ModalDisclosure] = useDisclosure(false);

  const handleOpen = () => {
    if (!opened && medicalOrderHook.orders === undefined) {
      medicalOrderHook.find({ dni });
    }
    OpenDisclosure.toggle();
  }

  const handleClose = () => {
    medicalOrderHook.find({ dni });
    ModalDisclosure.close();
  }

  return <>
    <Paper
      radius="lg"
      style={{ overflow: 'hidden', boxShadow: "none" }}
      shadow={undefined}
      withBorder>
      <PatientCollapseButton
        opened={opened}
        cols={entries.length}
        toggle={handleOpen}>
        {
          entries
        }
      </PatientCollapseButton>

      <Collapse in={opened} transitionDuration={250} transitionTimingFunction="linear">
        <ScrollArea mih={50} p={rem(16)}>
          <Flex justify='center' direction='column' gap={rem(16)} pos='relative' p={rem(16)}>
            <LoadingOverlay visible={medicalOrderHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            {
              medicalOrderHook.orders !== undefined && medicalOrderHook.orders.length > 0
                ? medicalOrderHook.orders.map((e, index) => <>
                  <UnstyledButton
                    key={e.id}
                    py={rem(8)}
                    px={rem(16)}
                    style={{
                      borderRadius: rem(16),
                      borderWidth: rem(1),
                      borderStyle: "solid"
                    }} onClick={() => {
                      medicalOrderHook.selectItem(index);
                      ModalDisclosure.open();
                    }}>
                    <Grid>
                      <Grid.Col span={4}>
                        <Text size='sm'>{e.process}</Text>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Text size='sm'>{e.results.length}</Text>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Text size='sm'>{dayjs(e.createAt).format("YYYY/MM/DD")}</Text>
                      </Grid.Col>
                    </Grid>
                  </UnstyledButton>
                </>)
                : <Text fw={300}>No se encontraron ordenes asociadas a este paciente</Text>
            }
          </Flex>
        </ScrollArea>
      </Collapse>
    </Paper>

    <Modal
      opened={modalStatus}
      onClose={handleClose}
      title="Asignación de morbilidad"
      closeOnEscape={false}
      centered
      size="lg">
      {
        medicalOrderHook.order?.results === undefined || medicalOrderHook.order.results.length <= 0
          ? <Text size='sm'>No hay resultados asociados</Text>
          : <Tabs variant="outline" defaultValue={`${medicalOrderHook.order.results[0].examName}-${medicalOrderHook.order.results[0].id}`} orientation="vertical">
            <Tabs.List>
              {
                medicalOrderHook.order?.results.map((e) => (
                  <Tabs.Tab key={e.id} value={`${e.examName}-${e.id}`}>
                    <Text size='xs'>{e.examName}</Text>
                  </Tabs.Tab>
                ))
              }
            </Tabs.List>

            {
              medicalOrderHook.order?.results.map((e) => (
                <Tabs.Panel key={e.id} value={`${e.examName}-${e.id}`}>
                  <Box ml={rem(16)} mt={rem(16)}>
                    <MedicalResultAssignDisease
                      orderResult={e} />
                  </Box>
                </Tabs.Panel>
              ))
            }
          </Tabs>
      }
    </Modal>
  </>
}

export { PatientCollapsableRow }