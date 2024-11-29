'use client'

import React from 'react'
import { ActionIcon, Flex, Grid, GridCol, Group, rem, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { LaboratoryValue, useMedicalOrderLaboratory } from '../_context/medical-order-laboratory.context';

const MedicalOrderLaboratoryItem: React.FC<{ index: number } & LaboratoryValue> = ({
    index,
    examName,
    examSubtype,
    examType
}) => {

    const theme = useMantineTheme();
    const { remove } = useMedicalOrderLaboratory();

    return (
        <Grid
            bg='var(--mantine-color-orange-light)'
            py={rem(16)}
            style={{ borderRadius: theme.radius.sm }}>
            <GridCol span={10}>
                <Stack>
                    <Text fw='bold' size='lg' ta='center'>{examName}</Text>
                    <Group justify='space-around'>
                        <Text size='xs' component='span'>
                            <Text fw='bold' component='span'>Tipo: </Text>
                            {examType}
                        </Text>
                        <Text size='xs' component='span'>
                            <Text fw='bold' component='span'>Subtipo: </Text>
                            {examSubtype}
                        </Text>
                    </Group>
                </Stack>
            </GridCol>
            <GridCol span={2}>
                <Flex
                    h='100%'
                    justify='center'
                    align='center'>
                    <ActionIcon
                        onClick={() => remove(index)}>
                        <IconX style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Flex>
            </GridCol>
        </Grid>
    );
}

export default MedicalOrderLaboratoryItem