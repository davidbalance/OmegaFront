'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import PeriodicJobRiskSchema, { defaultJobRisk } from '../_schemas/periodic-job-risk.schema'
import { z } from 'zod';
import { ActionIcon, Box, Checkbox, Divider, Grid, GridCol, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { optionsBiological, optionsChemical, optionsErgonomic, optionsMechanical, optionsPhysical, optionsPsychosocial } from '../_libs/options';

type PeriodicJobRiskFormProps = {
    data?: Partial<z.infer<typeof PeriodicJobRiskSchema>>;
    onSubmit?: (value: z.infer<typeof PeriodicJobRiskSchema>) => void;
}
const PeriodicJobRiskForm = React.forwardRef<HTMLFormElement, PeriodicJobRiskFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PeriodicJobRiskSchema>>({
        initialValues: {
            jobRisks: data?.jobRisks ?? [defaultJobRisk]
        },
        validate: zodResolver(PeriodicJobRiskSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PeriodicJobRiskSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, jobRisks: [...(prev.jobRisks ?? []), defaultJobRisk] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, jobRisks: [...(prev.jobRisks?.slice(0, index) ?? []), ...(prev.jobRisks?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <>
            <Title order={3}>Factores de Riesgos del Trabajo Actual</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {form.values.jobRisks.map((e, i) =>
                        <Grid key={i}>
                            <GridCol span={1}>
                                <Group
                                    h="100%"
                                    justify='center'
                                    align='center'
                                    gap={rem(8)}>
                                    {form.values.jobRisks.length - 1 === i && <ActionIcon
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>}
                                    {form.values.jobRisks.length > 1
                                        && <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>}
                                </Group>
                            </GridCol>
                            <GridCol span={11}>
                                <SimpleGrid cols={4}>
                                    <TextInput
                                        label="PUESTO DE TRABAJO / AREA"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`jobRisks.${i}.name`)} />
                                    <TextInput
                                        label="ACTIVIDADES"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.activity`)} />
                                    <TextInput
                                        label="TIEMPO DE TRABAJO (MESES)"
                                        type='number'
                                        min={0}
                                        {...form.getInputProps(`jobRisks.${i}.months`)} />
                                    <TextInput
                                        label="MEDIDAS PREVENTIVAS"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.preventiveMeasure`)} />
                                </SimpleGrid>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Fisico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsPhysical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsPhysical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Mecanico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsMechanical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsMechanical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Quimico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsChemical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsChemical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Biologico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsBiological).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsBiological] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Ergonomico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsErgonomic).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsErgonomic] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Psicosocial</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsPsychosocial).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsPsychosocial] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            {form.values.jobRisks.length > 1 &&
                                <GridCol span={12}>
                                    <Divider />
                                </GridCol>}
                        </Grid>
                    )}
                </Stack>
            </Box>
        </>
    )
});

PeriodicJobRiskForm.displayName = 'PeriodicJobRiskForm';

export default PeriodicJobRiskForm