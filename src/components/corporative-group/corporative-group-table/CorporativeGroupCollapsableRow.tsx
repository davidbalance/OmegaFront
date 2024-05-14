import { Collapse, LoadingOverlay, Paper, ScrollArea, rem, Text, Flex, Grid, UnstyledButton, Modal, List } from '@mantine/core'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { CorporativeGroupCollapseButton } from '../corporative-group-collapse-button/CorporativeGroupCollapseButton';
import { useBranch, useCompany } from '@/hooks';
import classes from './CorporativeGroupModal.module.css'

type CorporativeGroupCollapsableRowProps = {
  id: string;
  name: string;
  entries: React.ReactElement[],
}

const CorporativeGroupCollapsableRow: React.FC<CorporativeGroupCollapsableRowProps> = ({ entries, id, name}) => {
  const companyHook = useCompany();
  const branchHook = useBranch();

  const [opened, OpenDisclosure] = useDisclosure(false);
  const [modalStatus, ModalDisclosure] = useDisclosure(false);

  const handleOpen = () => {
    if (!opened && companyHook.companies.length == 0) {
        companyHook.find( id );
    }
    OpenDisclosure.toggle();
  }

  const handleClose = () => {
    companyHook.find( id );
    ModalDisclosure.close();
  }

  return <>
    <Paper
      radius="lg"
      style={{ overflow: 'hidden', boxShadow: "none" }}
      shadow={undefined}
      withBorder>
      <CorporativeGroupCollapseButton
        opened={opened}
        cols={entries.length}
        toggle={handleOpen}>
        {
          entries
        }
      </CorporativeGroupCollapseButton>

      <Collapse in={opened} transitionDuration={250} transitionTimingFunction="linear">
        <ScrollArea mih={50} p={rem(16)}>
          <Flex justify='center' direction='column' gap={rem(16)} pos='relative' p={rem(16)}>
            <LoadingOverlay visible={companyHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Grid>
              <Grid.Col span={3}>
                <Text size='sm' fw={600}>Nombre</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='sm' fw={600}>RUC</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='sm' fw={600}>Dirección</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='sm' fw={600}>Teléfono</Text>
              </Grid.Col>
            </Grid>
            {
              companyHook.companies !== undefined && companyHook.companies.length > 0
                ? companyHook.companies.map((e, index) => <>
                  <UnstyledButton
                    key={e.id}
                    py={rem(8)}
                    px={rem(16)}
                    style={{
                      borderRadius: rem(16),
                      borderWidth: rem(1),
                      borderStyle: "solid"
                    }} onClick={() => {
                        companyHook.selectItem(index);
                        branchHook.find(e.id.toString());
                      ModalDisclosure.open();
                    }}>
                    <Grid>
                      <Grid.Col span={3}>
                        <Text size='sm'>{e.name}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Text size='sm'>{e.ruc}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Text size='sm'>{e.address}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Text size='sm'>{e.phone}</Text>
                      </Grid.Col>
                    </Grid>
                  </UnstyledButton>
                </>)
                : <Text fw={300}>No se encontraron compañias asociadas a este grupo corporativo</Text>
            }
          </Flex>
        </ScrollArea>
      </Collapse>
    </Paper>

    <Modal
      opened={modalStatus}
      onClose={handleClose}
      title={`Sucursales asociadas a ${name}`}
      closeOnEscape={false}
      centered={false}
      size="lg"
      classNames={{
        header: classes.header,
        content: classes.modal,
        body: classes.body
      }}
    >
      {
        branchHook.branches === undefined || branchHook.branches.length <= 0
          ? <Text size='sm'>No hay resultados asociados</Text>
          : 
            <List>
              {
                branchHook.branches.map((e) => (
                  <List.Item key={`${e.name}-${e.id}`} >
                    <Text size='sm'>{e.name}</Text>
                  </List.Item>
                ))
              }
            </List>
      }
    </Modal>
  </>
}

export { CorporativeGroupCollapsableRow }